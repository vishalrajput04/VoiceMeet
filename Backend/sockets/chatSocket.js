export function registerChatSocket(io, socket) {
  let lastMessageAt = 0
  socket.on('send-message', ({ text } = {}) => {
    const room = socket.data.activeRoom
    const now = Date.now()
    if (
      !room ||
      now - lastMessageAt < 400 ||
      typeof text !== 'string' ||
      !text.trim() ||
      text.length > 2000
    )
      return
    lastMessageAt = now
    io.to(room).emit('receive-message', {
      id: `${socket.id}-${now}`,
      text: text.trim(),
      name: socket.data.user.name,
      userId: socket.data.user._id.toString(),
      createdAt: new Date(now).toISOString(),
    })
  })
}
