export async function speechToText(audio, { language, contentType = 'audio/webm' } = {}) {
  const apiKey = process.env.DEEPGRAM_API_KEY
  if (!apiKey) {
    const error = new Error('Speech recognition is not configured. Set DEEPGRAM_API_KEY.')
    error.status = 503
    throw error
  }
  if (!Buffer.isBuffer(audio) || audio.length === 0) {
    const error = new Error('Provide a non-empty audio body')
    error.status = 400
    throw error
  }
  const query = new URLSearchParams({ model: 'nova-2', smart_format: 'true' })
  if (language) query.set('language', language)
  const response = await fetch(`https://api.deepgram.com/v1/listen?${query}`, {
    method: 'POST',
    headers: { Authorization: `Token ${apiKey}`, 'Content-Type': contentType },
    body: audio,
  })
  if (!response.ok) {
    const error = new Error(`Speech provider returned ${response.status}`)
    error.status = 502
    throw error
  }
  const result = await response.json()
  return {
    text: result.results?.channels?.[0]?.alternatives?.[0]?.transcript || '',
    confidence: result.results?.channels?.[0]?.alternatives?.[0]?.confidence ?? null,
  }
}
