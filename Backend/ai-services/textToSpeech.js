export async function textToSpeech(text, { languageCode = 'en-US', voiceName } = {}) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY
  if (!apiKey) {
    const error = new Error('Voice generation is not configured. Set GOOGLE_TTS_API_KEY.')
    error.status = 503
    throw error
  }
  if (typeof text !== 'string' || !text.trim() || text.length > 5000) {
    const error = new Error('Provide text up to 5000 characters')
    error.status = 400
    throw error
  }
  const voice = { languageCode }
  if (voiceName) voice.name = voiceName
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: { text }, voice, audioConfig: { audioEncoding: 'MP3' } }),
    },
  )
  if (!response.ok) {
    const error = new Error(`Speech provider returned ${response.status}`)
    error.status = 502
    throw error
  }
  const result = await response.json()
  if (!result.audioContent) {
    const error = new Error('Speech provider returned no audio')
    error.status = 502
    throw error
  }
  return { audioContent: result.audioContent, mimeType: 'audio/mpeg' }
}
