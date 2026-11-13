import { speechToText } from './speechToText.js'
import { translateText } from './translateText.js'
import { textToSpeech } from './textToSpeech.js'

export async function translateTranscript(text, options) {
  const translation = await translateText(text, options)
  return { sourceText: text, ...translation }
}

export async function dubAudio(audio, { sourceLanguage, targetLanguage, voiceName } = {}) {
  const recognition = await speechToText(audio, { language: sourceLanguage })
  if (!recognition.text)
    return { ...recognition, translatedText: '', audioContent: null, mimeType: null }
  const translation = await translateText(recognition.text, {
    source: sourceLanguage || 'auto',
    target: targetLanguage,
  })
  const speech = await textToSpeech(translation.translatedText, {
    languageCode: targetLanguage,
    voiceName,
  })
  return { ...recognition, ...translation, ...speech }
}
