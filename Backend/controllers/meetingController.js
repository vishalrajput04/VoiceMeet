import * as meetingService from '../services/meetingService.js'

export async function create(req, res, next) {
  try {
    res.status(201).json({ meeting: await meetingService.createMeeting(req.user, req.body.title) })
  } catch (error) {
    next(error)
  }
}
export async function list(req, res, next) {
  try {
    res.json({ meetings: await meetingService.listMeetings(req.user) })
  } catch (error) {
    next(error)
  }
}
export async function get(req, res, next) {
  try {
    const meeting = await meetingService.getMeeting(req.params.meetingId)
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' })
    res.json({ meeting: meetingService.meetingView(meeting) })
  } catch (error) {
    next(error)
  }
}
export async function join(req, res, next) {
  try {
    res.json({ meeting: await meetingService.joinMeeting(req.user, req.params.meetingId) })
  } catch (error) {
    next(error)
  }
}
export async function leave(req, res, next) {
  try {
    res.json({ meeting: await meetingService.leaveMeeting(req.user, req.params.meetingId) })
  } catch (error) {
    next(error)
  }
}
