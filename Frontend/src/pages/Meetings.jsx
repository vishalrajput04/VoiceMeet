import { CalendarDays, Plus } from 'lucide-react'
import { MeetingRow } from '../components/meeting/MeetingRow.jsx'

export function MeetingsPage({ meetings, onCreate, onJoin }) {
  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">YOUR WORKSPACE</div>
          <h1>Meetings</h1>
          <p className="page-subtitle">Your recent conversations and upcoming calls.</p>
        </div>
        <button className="button button-primary" onClick={onCreate}>
          <Plus size={17} /> New meeting
        </button>
      </div>
      <div className="meeting-list page-meetings">
        {meetings.length ? (
          meetings.map((m) => <MeetingRow key={m.meetingId} meeting={m} onJoin={onJoin} />)
        ) : (
          <div className="empty-meetings">
            <div className="empty-icon">
              <CalendarDays size={20} />
            </div>
            <div>
              <b>Your meeting history is empty</b>
              <p>Create a meeting to see it here.</p>
            </div>
            <button className="button button-quiet" onClick={onCreate}>
              Create meeting <Plus size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
