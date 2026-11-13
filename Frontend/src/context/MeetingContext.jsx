import { useCallback, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { MeetingContext } from './meetingContext.js'
import * as meetingService from '../services/meetingService.js'

export function MeetingProvider({ children }) {
  const { token } = useAuth()
  const [meetings, setMeetings] = useState([])
  const refreshMeetings = useCallback(async () => {
    if (!token) {
      setMeetings([])
      return
    }
    const data = await meetingService.getMeetings(token)
    setMeetings(data.meetings || [])
  }, [token])
  const createMeeting = useCallback(
    async (title) => {
      const { meeting } = await meetingService.createMeeting(token, title)
      setMeetings((items) => [meeting, ...items])
      return meeting
    },
    [token],
  )
  const joinMeeting = useCallback(
    async (meetingId) => {
      const { meeting } = await meetingService.joinMeeting(token, meetingId)
      return meeting
    },
    [token],
  )
  const leaveMeeting = useCallback(
    (meetingId) => meetingService.leaveMeeting(token, meetingId),
    [token],
  )
  const value = useMemo(
    () => ({ meetings, setMeetings, refreshMeetings, createMeeting, joinMeeting, leaveMeeting }),
    [meetings, refreshMeetings, createMeeting, joinMeeting, leaveMeeting],
  )
  return <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>
}
