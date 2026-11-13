import 'dotenv/config'
import http from 'node:http'
import app from './app.js'
import { connectDatabase, disconnectDatabase } from './config/db.js'
import { attachSockets } from './sockets/index.js'

const required = ['MONGODB_URI', 'JWT_SECRET']
const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`)
  process.exit(1)
}
if (process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be at least 32 characters')
  process.exit(1)
}
const port = Number(process.env.PORT || 5000)
await connectDatabase()
const server = http.createServer(app)
attachSockets(server)
server.listen(port, () => console.log(`Lingua API and signaling server listening on ${port}`))
process.on('SIGINT', async () => {
  await disconnectDatabase()
  server.close(() => process.exit(0))
})
