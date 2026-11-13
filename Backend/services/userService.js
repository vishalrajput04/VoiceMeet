import User from '../models/User.js'
import { publicUser } from './authService.js'

export async function updateProfile(user, { name }) {
  if (name !== undefined) user.name = String(name).trim().slice(0, 80)
  await user.save()
  return publicUser(user)
}

export async function updateLanguages(user, { spokenLanguage, preferredLanguage }) {
  const supported = [
    'English',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Portuguese',
    'Mandarin',
  ]
  if (
    (spokenLanguage && !supported.includes(spokenLanguage)) ||
    (preferredLanguage && !supported.includes(preferredLanguage))
  ) {
    const error = new Error('Choose a supported language')
    error.status = 400
    throw error
  }
  if (spokenLanguage) user.spokenLanguage = spokenLanguage
  if (preferredLanguage) user.preferredLanguage = preferredLanguage
  await user.save()
  return publicUser(user)
}
