import {
  ChevronDown,
  Mic,
  MicOff,
  MonitorUp,
  MoreHorizontal,
  Phone,
  Users,
  Video,
  VideoOff,
} from 'lucide-react'

export default function MeetingControls({
  mic,
  camera,
  screen,
  chat,
  onToggleMic,
  onToggleCamera,
  onToggleScreen,
  onToggleChat,
  onShowPeople,
  onLeave,
}) {
  return (
    <div className="meeting-control-bar">
      <div className="control-group">
        <button className={`meeting-control ${!mic ? 'disabled' : ''}`} onClick={onToggleMic}>
          {mic ? <Mic size={19} /> : <MicOff size={19} />}
          <span>{mic ? 'Mute' : 'Unmute'}</span>
          <ChevronDown size={13} />
        </button>
        <button className={`meeting-control ${!camera ? 'disabled' : ''}`} onClick={onToggleCamera}>
          {camera ? <Video size={19} /> : <VideoOff size={19} />}
          <span>{camera ? 'Stop video' : 'Start video'}</span>
          <ChevronDown size={13} />
        </button>
        <button className={`meeting-control ${screen ? 'selected' : ''}`} onClick={onToggleScreen}>
          <MonitorUp size={19} />
          <span>Share screen</span>
        </button>
        <button className={`meeting-control ${chat ? 'selected' : ''}`} onClick={onToggleChat}>
          <span className="control-chat-icon">▤</span>
          <span>Chat</span>
        </button>
        <button className="meeting-control" onClick={onShowPeople}>
          <Users size={19} />
          <span>People</span>
          <b className="participant-badge">1</b>
        </button>
      </div>
      <div className="control-right">
        <button className="meeting-control more-control">
          <MoreHorizontal size={20} />
          <span>More</span>
        </button>
        <button className="leave-button" onClick={onLeave}>
          <Phone size={17} /> Leave
        </button>
      </div>
    </div>
  )
}
