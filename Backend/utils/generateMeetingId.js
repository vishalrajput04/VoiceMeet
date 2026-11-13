import { randomInt } from 'node:crypto'
import Meeting from '../models/Meeting.js'

export default async function generateMeetingId() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const id = `${randomInt(100, 1000)} ${randomInt(100, 1000)} ${randomInt(100, 1000)}`
    if (!(await Meeting.exists({ meetingId: id }))) return id
  }
  throw new Error('Could not allocate a unique meeting ID')
}
