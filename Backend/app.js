import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import meetingRoutes from './routes/meetingRoutes.js'
import translationRoutes from './routes/translationRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express()
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: true,
  }),
)
app.use(express.json({ limit: '32kb' }))
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 35,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
  authRoutes,
)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/users', userRoutes)
app.use('/api/meetings', meetingRoutes)
app.use('/api/translation', translationRoutes)
app.use((req, res) => res.status(404).json({ message: 'Route not found' }))
app.use(errorMiddleware)
export default app
