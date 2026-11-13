import * as translationService from '../services/translationService.js'

export async function transcribe(req, res, next) {
  try {
    res.json(
      await translationService.transcribe(req.body, {
        language: req.query.language,
        contentType: req.get('content-type'),
      }),
    )
  } catch (error) {
    next(error)
  }
}
export async function translate(req, res, next) {
  try {
    res.json(
      await translationService.translateTranscript(req.body.text, {
        source: req.body.source,
        target: req.body.target,
      }),
    )
  } catch (error) {
    next(error)
  }
}
export async function synthesize(req, res, next) {
  try {
    res.json(
      await translationService.synthesize(req.body.text, {
        languageCode: req.body.languageCode,
        voiceName: req.body.voiceName,
      }),
    )
  } catch (error) {
    next(error)
  }
}
