const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

// A session belongs to exactly one user — prevents any cross-user collision even if two
// browsers happen to generate the same sessionId string.
chatSchema.index({ userId: 1, sessionId: 1 }, { unique: true });

module.exports = mongoose.model('Chat', chatSchema);