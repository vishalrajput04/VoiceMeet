import { apiRequest } from './api.js'

export const updateLanguagePreferences = (token, spokenLanguage, preferredLanguage) =>
  apiRequest('/users/language', token, {
    method: 'PUT',
    body: JSON.stringify({ spokenLanguage, preferredLanguage }),
  })
