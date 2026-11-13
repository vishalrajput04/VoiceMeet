import * as userService from '../services/userService.js'

export function getProfile(req, res) {
  res.json({ user: req.user })
}
export async function updateProfile(req, res, next) {
  try {
    res.json({ user: await userService.updateProfile(req.user, req.body) })
  } catch (error) {
    next(error)
  }
}
export async function updateLanguages(req, res, next) {
  try {
    res.json({ user: await userService.updateLanguages(req.user, req.body) })
  } catch (error) {
    next(error)
  }
}
