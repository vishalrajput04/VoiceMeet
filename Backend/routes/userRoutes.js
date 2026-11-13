import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import auth from '../middleware/authMiddleware.js'

const router = Router()
router.use(auth)
router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.put('/language', userController.updateLanguages)
export default router
