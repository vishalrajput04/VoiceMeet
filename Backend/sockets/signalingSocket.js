const SIGNAL_EVENTS = ['offer', 'answer', 'ice-candidate']

export function registerSignalingSocket(io, socket) {
  for (const event of SIGNAL_EVENTS)
    socket.on(event, ({ to, payload } = {}) => {
      const room = socket.data.activeRoom
      if (!room || typeof to !== 'string' || !payload || typeof payload !== 'object') return
      const target = io.sockets.sockets.get(to)
      if (target?.rooms.has(room)) target.emit(event, { from: socket.id, payload })
    })
}
