import { useCallback, useEffect, useRef, useState } from 'react'

const LANGUAGE_CODES = {
  English: 'en-US',
  Hindi: 'hi-IN',
  Spanish: 'es-ES',
  French: 'fr-FR',
  German: 'de-DE',
  Japanese: 'ja-JP',
  Portuguese: 'pt-BR',
  Mandarin: 'zh-CN',
}

export function useTranslation(spokenLanguage = 'English', speaker = 'You', notify = () => {}) {
  const [enabled, setEnabled] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [status, setStatus] = useState('Browser speech recognition captions')
  const recognitionRef = useRef(null)
  useEffect(() => () => recognitionRef.current?.stop(), [])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setEnabled(false)
    setStatus('Captions paused')
  }, [])

  const start = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      notify('Live captions are not supported in this browser')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = LANGUAGE_CODES[spokenLanguage] || 'en-US'
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('')
      setTranscript([{ text, speaker }])
    }
    recognition.onerror = () => setStatus('Speech recognition stopped')
    recognition.start()
    recognitionRef.current = recognition
    setEnabled(true)
    setStatus(`Listening in ${spokenLanguage}`)
  }, [notify, spokenLanguage, speaker])

  const toggle = useCallback(() => (enabled ? stop() : start()), [enabled, start, stop])
  return { enabled, transcript, status, toggle, stop }
}
