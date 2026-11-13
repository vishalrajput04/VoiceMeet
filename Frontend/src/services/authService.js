import { apiRequest } from './api.js'

export const authenticate = (mode, form) =>
  apiRequest(`/auth/${mode}`, null, { method: 'POST', body: JSON.stringify(form) })
