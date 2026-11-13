import { ArrowUpRight, CalendarDays, Plus } from 'lucide-react'
import { MeetingRow } from '../meeting/MeetingRow.jsx'

export default function RecentMeetings({ meetings, onCreate, onJoin, onAll }) {
  return (
    <>
      <div className="section-heading meetings-heading">
        <div>
          <h2>Recent meetings</h2>
          <p>Pick up where you left off.</p>
        </div>
        <button className="text-link" onClick={onAll}>
          View all <ArrowUpRight size={14} />
        </button>
      </div>
      {meetings.length ? (
        <div className="meeting-list">
          {meetings.slice(0, 3).map((item) => (
            <MeetingRow key={item.meetingId} meeting={item} onJoin={onJoin} />
          ))}
        </div>
      ) : (
        <div className="empty-meetings">
          <div className="empty-icon">
            <CalendarDays size={20} />
          </div>
          <div>
            <b>No meetings yet</b>
            <p>Start your first conversation or join one with a meeting ID.</p>
          </div>
          <button className="button button-quiet" onClick={onCreate}>
            Create meeting <Plus size={15} />
          </button>
        </div>
      )}
    </>
  )
}
