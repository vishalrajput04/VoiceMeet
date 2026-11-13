import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'],
      credentials: true,
    },
  })
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token
      if (!token) return next(new Error('Authentication required'))
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(payload.sub).select(
        '_id name email preferredLanguage spokenLanguage',
      )
      if (!user) return next(new Error('User not found'))
      socket.data.user = user
      return next()
    } catch {
      return next(new Error('Invalid session'))
    }
  })
  return io
}
