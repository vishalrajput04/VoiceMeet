import { apiRequest } from './api.js'

export const transcribeAudio = (token, audioBlob, language) =>
  apiRequest(
    `/translation/transcribe${language ? `?language=${encodeURIComponent(language)}` : ''}`,
    token,
    {
      method: 'POST',
      headers: { 'Content-Type': audioBlob.type || 'audio/webm' },
      body: audioBlob,
    },
  )

export const translateText = (token, text, source, target) =>
  apiRequest('/translation/translate', token, {
    method: 'POST',
    body: JSON.stringify({ text, source, target }),
  })

export const synthesizeSpeech = (token, text, languageCode, voiceName) =>
  apiRequest('/translation/synthesize', token, {
    method: 'POST',
    body: JSON.stringify({ text, languageCode, voiceName }),
  })
