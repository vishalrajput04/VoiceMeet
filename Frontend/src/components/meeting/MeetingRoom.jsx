import { useEffect, useRef, useState } from 'react'
import { connectSocket } from '../../services/socketService.js'
import { useTranslation } from '../../hooks/useTranslation.js'
import { useWebRTC } from '../../hooks/useWebRTC.js'
import ChatPanel from './ChatPanel.jsx'
import MeetingControls from './MeetingControls.jsx'
import RoomNavbar from './RoomNavbar.jsx'
import TranslationBar from './TranslationBar.jsx'
import VideoStage from './VideoStage.jsx'

export function MeetingRoom({ meeting, user, onLeave, notify }) {
  const [mic, setMic] = useState(true),
    [camera, setCamera] = useState(true),
    [screen, setScreen] = useState(false),
    [chat, setChat] = useState(false),
    [sideTab, setSideTab] = useState('Chat')
  const { stream, setMicrophoneEnabled, setCameraEnabled } = useWebRTC(notify)
  const [remoteStream, setRemoteStream] = useState(null),
    [message, setMessage] = useState(''),
    [messages, setMessages] = useState([])
  const videoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const socketRef = useRef(null)
  const peersRef = useRef(new Map())
  const screenStreamRef = useRef(null)
  const {
    enabled: captions,
    transcript,
    status: translationStatus,
    toggle: toggleCaptions,
  } = useTranslation(user?.spokenLanguage, user?.name, notify)
  useEffect(() => () => screenStreamRef.current?.getTracks().forEach((track) => track.stop()), [])
  useEffect(() => {
    if (!stream || !videoRef.current || screen) return
    videoRef.current.srcObject = stream
  }, [stream, screen])
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream
  }, [remoteStream])
  useEffect(() => {
    if (!stream) return
    const token = localStorage.getItem('lingua-token')
    if (!token) {
      notify('Sign in is required for live meeting connections')
      return
    }
    const socket = connectSocket(token)
    socketRef.current = socket
    const connections = peersRef.current
    const createPeer = (peerId) => {
      if (peersRef.current.has(peerId)) return peersRef.current.get(peerId)
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
      stream.getTracks().forEach((track) => pc.addTrack(track, stream))
      pc.onicecandidate = (event) => {
        if (event.candidate) socket.emit('ice-candidate', { to: peerId, payload: event.candidate })
      }
      pc.ontrack = (event) => setRemoteStream(event.streams[0])
      pc.onconnectionstatechange = () => {
        if (['failed', 'disconnected'].includes(pc.connectionState))
          notify('A participant connection was interrupted')
      }
      peersRef.current.set(peerId, pc)
      return pc
    }
    socket.on('connect', () =>
      socket.emit('join-meeting', { meetingId: meeting.meetingId }, async (result) => {
        if (result?.error) {
          notify(result.error)
          return
        }
        for (const peer of result.peers || []) {
          const pc = createPeer(peer.socketId)
          const offer = await pc.createOffer()
          await pc.setLocalDescription(offer)
          socket.emit('offer', { to: peer.socketId, payload: offer })
        }
      }),
    )
    socket.on('offer', async ({ from, payload }) => {
      const pc = createPeer(from)
      await pc.setRemoteDescription(payload)
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      socket.emit('answer', { to: from, payload: answer })
    })
    socket.on('answer', async ({ from, payload }) => {
      const pc = peersRef.current.get(from)
      if (pc?.signalingState === 'have-local-offer') await pc.setRemoteDescription(payload)
    })
    socket.on('ice-candidate', async ({ from, payload }) => {
      try {
        await peersRef.current.get(from)?.addIceCandidate(payload)
      } catch {
        /* stale candidate after a peer left */
      }
    })
    socket.on('participant-left', ({ socketId }) => {
      peersRef.current.get(socketId)?.close()
      peersRef.current.delete(socketId)
      setRemoteStream(null)
    })
    socket.on('receive-message', (item) => setMessages((items) => [...items, item]))
    socket.on('connect_error', (error) =>
      notify(error.message || 'Could not connect to meeting signaling'),
    )
    return () => {
      socket.disconnect()
      connections.forEach((pc) => pc.close())
      connections.clear()
    }
  }, [stream, meeting.meetingId, notify])
  const toggleScreen = async () => {
    try {
      if (screen) {
        screenStreamRef.current?.getTracks().forEach((track) => track.stop())
        const cameraTrack = stream?.getVideoTracks()[0]
        peersRef.current.forEach((pc) =>
          pc
            .getSenders()
            .find((sender) => sender.track?.kind === 'video')
            ?.replaceTrack(cameraTrack || null),
        )
        if (videoRef.current && stream) videoRef.current.srcObject = stream
        setScreen(false)
        notify('Screen sharing ended')
        return
      }
      const display = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenStreamRef.current = display
      const displayTrack = display.getVideoTracks()[0]
      peersRef.current.forEach((pc) =>
        pc
          .getSenders()
          .find((sender) => sender.track?.kind === 'video')
          ?.replaceTrack(displayTrack),
      )
      if (videoRef.current) videoRef.current.srcObject = display
      setScreen(true)
      displayTrack.onended = () => {
        const cameraTrack = stream?.getVideoTracks()[0]
        peersRef.current.forEach((pc) =>
          pc
            .getSenders()
            .find((sender) => sender.track?.kind === 'video')
            ?.replaceTrack(cameraTrack || null),
        )
        if (videoRef.current && stream) videoRef.current.srcObject = stream
        setScreen(false)
      }
      notify('Screen sharing started')
    } catch {
      notify('Screen sharing was cancelled')
    }
  }
  const sendMessage = () => {
    if (!message.trim()) return
    socketRef.current?.emit('send-message', { text: message.trim() })
    setMessage('')
  }

  return (
    <div className="room-overlay">
      <RoomNavbar meetingId={meeting.meetingId} />
      <div className={`room-body ${chat ? 'with-chat' : ''}`}>
        <VideoStage
          user={user}
          camera={camera}
          stream={stream}
          remoteStream={remoteStream}
          videoRef={videoRef}
          remoteVideoRef={remoteVideoRef}
          captions={captions}
          transcript={transcript}
        />
        {chat && (
          <ChatPanel
            user={user}
            sideTab={sideTab}
            setSideTab={setSideTab}
            onClose={() => setChat(false)}
            messages={messages}
            message={message}
            setMessage={setMessage}
            onSend={sendMessage}
          />
        )}
      </div>
      <TranslationBar
        status={translationStatus}
        language={user?.preferredLanguage}
        captions={captions}
        onToggleCaptions={toggleCaptions}
        notify={notify}
      />
      <MeetingControls
        mic={mic}
        camera={camera}
        screen={screen}
        chat={chat}
        onToggleMic={() => {
          setMic(!mic)
          setMicrophoneEnabled(!mic)
        }}
        onToggleCamera={() => {
          setCamera(!camera)
          setCameraEnabled(!camera)
        }}
        onToggleScreen={toggleScreen}
        onToggleChat={() => setChat(!chat)}
        onShowPeople={() => {
          setChat(true)
          setSideTab('People')
        }}
        onLeave={onLeave}
      />
    </div>
  )
}
