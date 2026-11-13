import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AuthModal } from '../components/common/AuthModal.jsx'
import Sidebar from '../components/common/Sidebar.jsx'
import Navbar from '../components/common/Navbar.jsx'
import { MeetingRoom } from '../components/meeting/MeetingRoom.jsx'
import { PrejoinModal } from '../components/meeting/PrejoinModal.jsx'
import { Dashboard } from './Home.jsx'
import { MeetingsPage } from './Meetings.jsx'
import { PlaceholderPage } from './Settings.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useMeeting } from '../hooks/useMeeting.js'
import * as authService from '../services/authService.js'
import * as userService from '../services/userService.js'
import '../App.css'

const pageForPath = (pathname) =>
  ({ '/': 'Home', '/meetings': 'Meetings', '/contacts': 'Contacts', '/settings': 'Settings' })[
    pathname
  ] || 'Home'

export default function AppShell() {
  const { user, setUser, token, setToken } = useAuth()
  const {
    meetings,
    refreshMeetings,
    createMeeting: createMeetingRequest,
    joinMeeting: joinMeetingRequest,
    leaveMeeting,
  } = useMeeting()
  const location = useLocation()
  const navigate = useNavigate()
  const { meetingId: inviteId } = useParams()
  const page = pageForPath(location.pathname)
  const [modal, setModal] = useState('')
  const [meeting, setMeeting] = useState(null)
  const [notice, setNotice] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const inviteJoined = useRef('')

  const notify = useCallback((message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3600)
  }, [])

  useEffect(() => {
    refreshMeetings().catch(() => {})
  }, [refreshMeetings])

  const authenticate = async (form) => {
    try {
      const data = await authService.authenticate(authMode, form)
      localStorage.setItem('lingua-token', data.token)
      localStorage.setItem('lingua-user', JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      setModal('')
      notify(`Welcome ${data.user.name.split(' ')[0]}`)
    } catch (error) {
      notify(error.message)
    }
  }

  const signOut = () => {
    localStorage.removeItem('lingua-token')
    localStorage.removeItem('lingua-user')
    setToken(null)
    setUser(null)
    notify('You have signed out')
  }

  const createMeeting = useCallback(async () => {
    try {
      if (!token) {
        setAuthMode('login')
        setModal('auth')
        notify('Sign in to create a meeting')
        return
      }
      const created = await createMeetingRequest('Quick sync')
      setMeeting(created)
      setModal('prejoin')
    } catch (error) {
      notify(error.message)
    }
  }, [createMeetingRequest, notify, token])

  const joinMeeting = useCallback(
    async (id) => {
      const normalizedId = id.trim()
      if (!normalizedId) return
      try {
        if (!token) {
          setAuthMode('login')
          setModal('auth')
          notify('Sign in to join this meeting')
          return
        }
        const joined = await joinMeetingRequest(normalizedId)
        setMeeting(joined)
        setModal('prejoin')
      } catch (error) {
        notify(error.message)
      }
    },
    [joinMeetingRequest, notify, token],
  )

  useEffect(() => {
    if (!inviteId) return
    if (!token) return
    if (inviteJoined.current === inviteId) return
    inviteJoined.current = inviteId
    joinMeeting(decodeURIComponent(inviteId))
  }, [inviteId, joinMeeting, token])

  const saveLanguages = async (spokenLanguage, preferredLanguage) => {
    try {
      const data = await userService.updateLanguagePreferences(
        token,
        spokenLanguage,
        preferredLanguage,
      )
      setUser(data.user)
      localStorage.setItem('lingua-user', JSON.stringify(data.user))
      notify('Language preferences saved')
    } catch (error) {
      notify(error.message)
    }
  }

  const leaveCurrentMeeting = async () => {
    const currentMeeting = meeting
    setModal('')
    setMeeting(null)
    if (currentMeeting) {
      try {
        await leaveMeeting(currentMeeting.meetingId)
      } catch {
        /* The room is already closed locally. */
      }
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        user={user}
        meetingCount={meetings.length}
        onNavigate={(next) => navigate(next === 'Home' ? '/' : `/${next.toLowerCase()}`)}
        onSignOut={signOut}
        onSignIn={() => {
          setAuthMode('login')
          setModal('auth')
        }}
        notify={notify}
      />
      <main className="main-area">
        <Navbar
          page={page}
          user={user}
          onProfile={() =>
            user ? navigate('/settings') : (setAuthMode('login'), setModal('auth'))
          }
          notify={notify}
        />
        {page === 'Home' && (
          <Dashboard
            user={user}
            meetings={meetings}
            onCreate={createMeeting}
            onJoin={joinMeeting}
            onAuth={() => {
              setAuthMode('login')
              setModal('auth')
            }}
            onAll={() => navigate('/meetings')}
            onSettings={() => navigate('/settings')}
          />
        )}
        {page === 'Meetings' && (
          <MeetingsPage meetings={meetings} onCreate={createMeeting} onJoin={joinMeeting} />
        )}
        {(page === 'Contacts' || page === 'Settings') && (
          <PlaceholderPage page={page} user={user} onSave={saveLanguages} />
        )}
      </main>
      {notice && (
        <div className="toast">
          <Check size={16} />
          {notice}
        </div>
      )}
      {(modal === 'auth' || (inviteId && !token)) && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setModal('')}
          onSubmit={authenticate}
        />
      )}
      {modal === 'prejoin' && meeting && (
        <PrejoinModal
          meeting={meeting}
          user={user}
          onClose={() => setModal('')}
          onJoin={() => setModal('room')}
        />
      )}
      {modal === 'room' && meeting && (
        <MeetingRoom meeting={meeting} user={user} onLeave={leaveCurrentMeeting} notify={notify} />
      )}
    </div>
  )
}
