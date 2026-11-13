import { useState } from 'react'
import DashboardHeader from '../components/home/DashboardHeader.jsx'
import HeroBanner from '../components/home/HeroBanner.jsx'
import QuickActions from '../components/home/QuickActions.jsx'
import RecentMeetings from '../components/home/RecentMeetings.jsx'
import Footer from '../components/common/Footer.jsx'
import { JoinModal } from '../components/common/JoinModal.jsx'

export function Dashboard({ user, meetings, onCreate, onJoin, onAuth, onAll, onSettings }) {
  const [joinOpen, setJoinOpen] = useState(false)
  const openJoin = () => setJoinOpen(true)
  const joinFromModal = (id) => {
    setJoinOpen(false)
    onJoin(id)
  }

  return (
    <div className="page-content">
      <DashboardHeader user={user} onCreate={onCreate} onJoin={openJoin} onAuth={onAuth} />
      <HeroBanner onCreate={onCreate} onJoin={openJoin} />
      <QuickActions onCreate={onCreate} onJoin={openJoin} onSettings={onSettings} />
      <RecentMeetings meetings={meetings} onCreate={onCreate} onJoin={onJoin} onAll={onAll} />
      <Footer />
      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} onJoin={joinFromModal} />}
    </div>
  )
}
