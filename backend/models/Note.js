const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    summary: { type: String, default: null },
    tags: [{ type: String }],
    color: { type: String, default: '#f9fafb' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);