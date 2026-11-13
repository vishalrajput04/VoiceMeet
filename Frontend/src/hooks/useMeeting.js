import { useContext } from 'react'
import { MeetingContext } from '../context/meetingContext.js'

export function useMeeting() {
  const context = useContext(MeetingContext)
  if (!context) throw new Error('useMeeting must be used inside MeetingProvider')
  return context
}
