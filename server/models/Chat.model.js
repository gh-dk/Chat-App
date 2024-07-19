import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  contentType: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  content: { type: String },  // For text or base64 encoded image/file content
  fileUrl: { type: String },  // For file: URL to the stored file
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  typeGroup: { type: Boolean, default: false },
  groupName: { type: String },
  groupAvatar: { type: String }
});

chatSchema.pre('save', function (next) {
  this.participants = [...new Set(this.participants)];

  if (this.participants.length > 2) {
    this.typeGroup = true;

    if (!this.groupName || !this.groupAvatar) {
      const err = new Error('Group name and group avatar are mandatory for group chats.');
      return next(err);
    }
  } else {
    this.typeGroup = false;
  }

  next();
});

export default mongoose.model('Chat', chatSchema);
