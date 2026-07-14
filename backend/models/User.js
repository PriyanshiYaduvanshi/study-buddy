const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    photoURL: { type: String, default: null },
    provider: { type: String, enum: ['password', 'google.com'], default: 'password' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
