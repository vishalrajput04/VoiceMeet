import jwt from 'jsonwebtoken'

export default function generateToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
