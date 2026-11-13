export async function translateText(text, { source = 'auto', target } = {}) {
  const endpoint = process.env.LIBRETRANSLATE_URL
  if (!endpoint) {
    const error = new Error('Translation is not configured. Set LIBRETRANSLATE_URL.')
    error.status = 503
    throw error
  }
  if (typeof text !== 'string' || !text.trim() || text.length > 5000 || !target) {
    const error = new Error('Provide text up to 5000 characters and a target language')
    error.status = 400
    throw error
  }
  const body = { q: text, source, target, format: 'text' }
  if (process.env.LIBRETRANSLATE_API_KEY) body.api_key = process.env.LIBRETRANSLATE_API_KEY
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const error = new Error(`Translation provider returned ${response.status}`)
    error.status = 502
    throw error
  }
  const result = await response.json()
  if (typeof result.translatedText !== 'string') {
    const error = new Error('Translation provider returned an invalid response')
    error.status = 502
    throw error
  }
  return {
    translatedText: result.translatedText,
    detectedLanguage: result.detectedLanguage?.language || null,
  }
}
