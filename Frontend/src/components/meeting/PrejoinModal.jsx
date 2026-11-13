import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mic, MicOff, ShieldCheck, Video, VideoOff } from 'lucide-react'
import { Modal } from '../common/Modal.jsx'
import { initials } from '../../utils/format.js'

export function PrejoinModal({ meeting, user, onClose, onJoin }) {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState('')
  const videoRef = useRef(null)
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(true)
  const startPreview = async () => {
    try {
      const next = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setStream(next)
      setError('')
    } catch {
      setError('Camera or microphone permission was blocked. You can still join without them.')
    }
  }
  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream
    return () => stream?.getTracks().forEach((track) => track.stop())
  }, [stream])
  return (
    <Modal onClose={onClose}>
      <div className="prejoin-preview">
        <video ref={videoRef} autoPlay muted playsInline />
        {!stream && (
          <div className="preview-placeholder">
            <div className="avatar avatar-large">{initials(user?.name)}</div>
            <button className="button button-quiet" onClick={startPreview}>
              <Video size={15} /> Turn on camera
            </button>
          </div>
        )}
        <div className="preview-controls">
          <button
            onClick={() => {
              setMic(!mic)
              stream?.getAudioTracks().forEach((t) => {
                t.enabled = !mic
              })
            }}
          >
            {mic ? <Mic size={17} /> : <MicOff size={17} />}
          </button>
          <button
            onClick={() => {
              setCamera(!camera)
              stream?.getVideoTracks().forEach((t) => {
                t.enabled = !camera
              })
            }}
          >
            {camera ? <Video size={17} /> : <VideoOff size={17} />}
          </button>
        </div>
      </div>
      <h2>Ready to join?</h2>
      <p>
        Meeting <b>{meeting.title || 'Quick sync'}</b> · ID {meeting.meetingId}
      </p>
      {error && <p className="inline-error">{error}</p>}
      <button className="button button-primary modal-submit" onClick={onJoin}>
        Join meeting <ArrowUpRight size={15} />
      </button>
      <div className="modal-secure">
        <ShieldCheck size={14} /> Your camera and mic are off until you join
      </div>
    </Modal>
  )
}
