import { useCallback, useEffect, useState } from 'react'

export function useWebRTC(onMediaError) {
  const [stream, setStream] = useState(null)

  useEffect(() => {
    let active = true
    let acquiredStream
    navigator.mediaDevices
      ?.getUserMedia({ audio: true, video: true })
      .then((media) => {
        acquiredStream = media
        if (active) setStream(media)
        else media.getTracks().forEach((track) => track.stop())
      })
      .catch(() =>
        onMediaError('Camera and microphone permission was blocked. You joined without media.'),
      )
    return () => {
      active = false
      acquiredStream?.getTracks().forEach((track) => track.stop())
    }
  }, [onMediaError])

  const setMicrophoneEnabled = useCallback(
    (enabled) =>
      stream?.getAudioTracks().forEach((track) => {
        track.enabled = enabled
      }),
    [stream],
  )
  const setCameraEnabled = useCallback(
    (enabled) =>
      stream?.getVideoTracks().forEach((track) => {
        track.enabled = enabled
      }),
    [stream],
  )
  return { stream, setMicrophoneEnabled, setCameraEnabled }
}
