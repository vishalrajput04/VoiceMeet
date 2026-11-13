import mongoose from 'mongoose'

const meetingSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true, unique: true, index: true },
    title: { type: String, default: 'Quick sync', trim: true, maxlength: 100 },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['scheduled', 'active', 'ended'], default: 'active' },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
  },
  { timestamps: true },
)

export default mongoose.model('Meeting', meetingSchema)
