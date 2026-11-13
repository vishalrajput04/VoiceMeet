import { createSocketServer } from '../config/socket.js'
import { registerMeetingSocket } from './meetingSocket.js'
import { registerSignalingSocket } from './signalingSocket.js'
import { registerChatSocket } from './chatSocket.js'

export function attachSockets(httpServer) {
  const io = createSocketServer(httpServer)
  io.on('connection', (socket) => {
    registerMeetingSocket(io, socket)
    registerSignalingSocket(io, socket)
    registerChatSocket(io, socket)
  })
  return io
}
