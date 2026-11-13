import * as authService from '../services/authService.js'

export async function register(req, res, next) {
  const { name, email, password } = req.body
  if (
    !name?.trim() ||
    !/^\S+@\S+\.\S+$/.test(email || '') ||
    typeof password !== 'string' ||
    password.length < 8
  )
    return res.status(400).json({
      message: 'Enter your name, a valid email, and a password with at least 8 characters',
    })
  try {
    res.status(201).json(await authService.register({ name, email, password }))
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    res.json(await authService.login(req.body))
  } catch (error) {
    next(error)
  }
}

export function currentUser(req, res) {
  res.json({ user: authService.publicUser(req.user) })
}
