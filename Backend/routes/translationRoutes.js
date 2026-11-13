import { Router } from 'express'
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as controller from '../controllers/translationController.js'

const router = Router()
router.use(authMiddleware)
router.post(
  '/transcribe',
  express.raw({ type: ['audio/webm', 'audio/wav', 'audio/mpeg'], limit: '8mb' }),
  controller.transcribe,
)
router.post('/translate', controller.translate)
router.post('/synthesize', controller.synthesize)
export default router
