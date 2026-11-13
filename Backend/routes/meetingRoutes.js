import { Router } from 'express'
import * as meetingController from '../controllers/meetingController.js'
import auth from '../middleware/authMiddleware.js'

const router = Router()
router.use(auth)
router.post('/', meetingController.create)
router.get('/', meetingController.list)
router.get('/:meetingId', meetingController.get)
router.post('/:meetingId/join', meetingController.join)
router.post('/:meetingId/leave', meetingController.leave)
export default router
