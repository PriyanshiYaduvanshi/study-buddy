const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

// POST /api/auth/sync — upserts the MongoDB user record from the verified Firebase token.
// Called by the frontend right after login, register, or Google sign-in.
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { uid, email, name, picture, firebase } = req.firebaseUser;

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        firebaseUid: uid,
        name: name || email?.split('@')[0] || 'Student',
        email,
        photoURL: picture || null,
        provider: firebase?.sign_in_provider === 'google.com' ? 'google.com' : 'password',
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me — returns the current user's MongoDB profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ error: 'User profile not found. Call /api/auth/sync first.' });
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
