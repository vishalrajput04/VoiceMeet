import { ArrowUpRight, Clipboard, Video } from 'lucide-react'
import { initials } from '../../utils/format.js'

export function MeetingRow({ meeting, onJoin }) {
  return (
    <div className="meeting-row">
      <span className="meeting-type-icon">
        <Video size={17} />
      </span>
      <div className="meeting-info">
        <b>{meeting.title || 'Quick sync'}</b>
        <small>
          {meeting.createdAt
            ? new Date(meeting.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : 'Recently'}{' '}
          · Meeting ID <span>{meeting.meetingId}</span>
        </small>
      </div>
      <div className="meeting-participants">
        <span className="avatar avatar-tiny">{initials(meeting.host?.name || 'You')}</span>
        <span className="avatar avatar-tiny avatar-peach">
          {initials(meeting.host?.name || 'G')}
        </span>
      </div>
      <span className="meeting-status">
        <i /> Ended
      </span>
      <button
        className="row-menu"
        onClick={() =>
          navigator.clipboard?.writeText(`${window.location.origin}/meeting/${meeting.meetingId}`)
        }
      >
        {' '}
        <Clipboard size={16} />
      </button>
      <button className="button button-quiet button-sm" onClick={() => onJoin(meeting.meetingId)}>
        Rejoin <ArrowUpRight size={14} />
      </button>
    </div>
  )
}
