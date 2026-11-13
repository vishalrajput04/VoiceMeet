import { translateTranscript } from '../ai-services/translationPipeline.js'
import { speechToText } from '../ai-services/speechToText.js'
import { textToSpeech } from '../ai-services/textToSpeech.js'

export { translateTranscript }
export async function transcribe(audio, options) {
  return speechToText(audio, options)
}
export async function synthesize(text, options) {
  return textToSpeech(text, options)
}
