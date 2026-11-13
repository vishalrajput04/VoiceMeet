import { apiRequest } from './api.js'

export const getMeetings = (token) => apiRequest('/meetings', token)
export const createMeeting = (token, title) =>
  apiRequest('/meetings', token, { method: 'POST', body: JSON.stringify({ title }) })
export const joinMeeting = (token, meetingId) =>
  apiRequest(`/meetings/${encodeURIComponent(meetingId)}/join`, token, { method: 'POST' })
export const leaveMeeting = (token, meetingId) =>
  apiRequest(`/meetings/${encodeURIComponent(meetingId)}/leave`, token, { method: 'POST' })
