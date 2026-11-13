import bcrypt from 'bcrypt'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  preferredLanguage: user.preferredLanguage,
  spokenLanguage: user.spokenLanguage,
})

export async function register({ name, email, password }) {
  const normalizedEmail = email.toLowerCase()
  if (await User.exists({ email: normalizedEmail })) {
    const error = new Error('An account with that email already exists')
    error.status = 409
    throw error
  }
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 12),
  })
  return { token: generateToken(user._id), user: publicUser(user) }
}

export async function login({ email, password }) {
  const user = await User.findOne({ email: String(email || '').toLowerCase() }).select('+password')
  if (!user || !(await bcrypt.compare(password || '', user.password))) {
    const error = new Error('Email or password is incorrect')
    error.status = 401
    throw error
  }
  return { token: generateToken(user._id), user: publicUser(user) }
}

export { publicUser }
