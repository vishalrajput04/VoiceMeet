import { AudioLines, Clock3, Link2, MoreHorizontal } from 'lucide-react'

export default function RoomNavbar({ meetingId }) {
  const copyInvite = () =>
    navigator.clipboard?.writeText(`${window.location.origin}/meeting/${meetingId}`)
  return (
    <div className="room-top">
      <a className="brand room-brand" href="/">
        <span className="brand-mark">
          <AudioLines size={18} />
        </span>
        <span>
          lingua<span className="brand-dot">.</span>
        </span>
      </a>
      <div className="room-meta">
        <span className="record-dot" /> {meetingId}{' '}
        <span className="room-time">
          <Clock3 size={14} /> 00:00
        </span>
      </div>
      <button className="room-top-btn" onClick={copyInvite}>
        <Link2 size={16} /> Copy invite link
      </button>
      <button className="icon-button room-more" aria-label="More">
        <MoreHorizontal size={20} />
      </button>
    </div>
  )
}
