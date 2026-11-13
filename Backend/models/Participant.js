import mongoose from 'mongoose'

const participantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date },
    spokenLanguage: String,
    preferredLanguage: String,
  },
  { timestamps: true },
)

participantSchema.index({ meeting: 1, user: 1 }, { unique: true })
export default mongoose.model('Participant', participantSchema)
