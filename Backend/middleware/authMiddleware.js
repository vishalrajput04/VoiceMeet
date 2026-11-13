import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
    if (!token) return res.status(401).json({ message: 'Please sign in to continue' })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub).select(
      '_id name email preferredLanguage spokenLanguage',
    )
    if (!user) return res.status(401).json({ message: 'Your session is no longer valid' })
    req.user = user
    return next()
  } catch {
    return res.status(401).json({ message: 'Your session is invalid or has expired' })
  }
}
