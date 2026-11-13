import Meeting from '../models/Meeting.js'
import Participant from '../models/Participant.js'
import generateMeetingId from '../utils/generateMeetingId.js'

export const meetingView = (meeting) => ({
  meetingId: meeting.meetingId,
  title: meeting.title,
  host: meeting.host,
  participants: meeting.participants,
  status: meeting.status,
  startTime: meeting.startTime,
  endTime: meeting.endTime,
  createdAt: meeting.createdAt,
})

export async function createMeeting(user, title) {
  const meeting = await Meeting.create({
    meetingId: await generateMeetingId(),
    title: String(title || 'Quick sync')
      .trim()
      .slice(0, 100),
    host: user._id,
    participants: [user._id],
  })
  await Participant.create({
    user: user._id,
    meeting: meeting._id,
    spokenLanguage: user.spokenLanguage,
    preferredLanguage: user.preferredLanguage,
  })
  return meetingView(meeting)
}

export async function listMeetings(user) {
  const meetings = await Meeting.find({ $or: [{ host: user._id }, { participants: user._id }] })
    .populate('host', 'name')
    .sort({ createdAt: -1 })
    .limit(50)
  return meetings.map(meetingView)
}

export async function getMeeting(meetingId) {
  return Meeting.findOne({ meetingId }).populate('host', 'name')
}

export async function joinMeeting(user, meetingId) {
  const meeting = await getMeeting(meetingId)
  if (!meeting) {
    const error = new Error('Meeting not found. Check the ID and try again.')
    error.status = 404
    throw error
  }
  if (meeting.status === 'ended') {
    const error = new Error('This meeting has ended')
    error.status = 410
    throw error
  }
  if (!meeting.participants.some((id) => id.equals(user._id))) {
    meeting.participants.push(user._id)
    await meeting.save()
  }
  await Participant.findOneAndUpdate(
    { meeting: meeting._id, user: user._id },
    { $set: { joinedAt: new Date(), leftAt: null } },
    { upsert: true },
  )
  return meetingView(meeting)
}

export async function leaveMeeting(user, meetingId) {
  const meeting = await Meeting.findOne({ meetingId })
  if (!meeting) {
    const error = new Error('Meeting not found')
    error.status = 404
    throw error
  }
  if (meeting.host.equals(user._id)) {
    meeting.status = 'ended'
    meeting.endTime = new Date()
  } else meeting.participants = meeting.participants.filter((id) => !id.equals(user._id))
  await Participant.findOneAndUpdate(
    { meeting: meeting._id, user: user._id },
    { $set: { leftAt: new Date() } },
  )
  await meeting.save()
  return meetingView(meeting)
}
