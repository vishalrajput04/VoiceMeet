import { MoreHorizontal, Users } from 'lucide-react'
import { initials } from '../../utils/format.js'

export default function VideoStage({
  user,
  camera,
  stream,
  remoteStream,
  videoRef,
  remoteVideoRef,
  captions,
  transcript,
}) {
  return (
    <div className="video-stage">
      <div className="video-grid">
        <div className="video-tile local-tile">
          {camera && stream ? (
            <video ref={videoRef} autoPlay muted playsInline />
          ) : (
            <div className="avatar avatar-large">{initials(user?.name)}</div>
          )}
          <span className="tile-name">
            <i className="audio-indicator">
              <i />
              <i />
              <i />
            </i>
            {user?.name || 'You'} (You)
          </span>
          <button className="tile-more" aria-label="Video options">
            <MoreHorizontal size={17} />
          </button>
        </div>
        <div className="video-tile guest-tile">
          {remoteStream ? (
            <video ref={remoteVideoRef} autoPlay playsInline />
          ) : (
            <>
              <div className="guest-avatar">
                <div className="guest-head" />
                <div className="guest-shirt" />
              </div>
              <span className="tile-name">Waiting for someone to join</span>
            </>
          )}
        </div>
      </div>
      <div className="stage-status">
        <span className="status-dot" /> Connection secure <span className="stage-sep">·</span>
        <Users size={14} /> 1 participant
      </div>
      {captions && transcript.length > 0 && (
        <div className="live-caption">
          <small>{transcript[0].speaker}</small>
          <p>{transcript[0].text}</p>
        </div>
      )}
    </div>
  )
}
