import Meeting from '../models/Meeting.js'

export function registerMeetingSocket(io, socket) {
  socket.on('join-meeting', async ({ meetingId } = {}, reply = () => {}) => {
    try {
      const meeting = await Meeting.findOne({ meetingId })
      if (
        !meeting ||
        meeting.status === 'ended' ||
        !meeting.participants.some((id) => id.equals(socket.data.user._id))
      )
        return reply({ error: 'You are not an active participant in this meeting' })
      const existingPeers = [...(io.sockets.adapter.rooms.get(meetingId) || [])]
        .filter((id) => id !== socket.id)
        .map((socketId) => ({ socketId }))
      socket.data.activeRoom = meetingId
      socket.join(meetingId)
      socket
        .to(meetingId)
        .emit('participant-joined', { socketId: socket.id, name: socket.data.user.name })
      return reply({
        ok: true,
        socketId: socket.id,
        peers: existingPeers,
        participant: { id: socket.data.user._id.toString(), name: socket.data.user.name },
      })
    } catch {
      return reply({ error: 'Could not join the meeting room' })
    }
  })
  socket.on('disconnect', () => {
    if (socket.data.activeRoom)
      socket.to(socket.data.activeRoom).emit('participant-left', { socketId: socket.id })
  })
}
