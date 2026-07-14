const admin = require('../config/firebaseAdmin');
const User = require('../models/User');

/**
 * Verifies the Firebase ID token sent as "Authorization: Bearer <token>".
 * On success, attaches:
 *   req.firebaseUser -> the decoded Firebase token (uid, email, name, picture, firebase.sign_in_provider)
 *   req.user         -> the matching MongoDB User document, created on the fly if it doesn't exist yet
 * Use this on any route that requires the caller to be logged in.
 *
 * req.user is guaranteed to exist for any request that reaches next() — routes never need to
 * null-check it. This also means the frontend's explicit POST /api/auth/sync call is a nice-to-have
 * (keeps the profile fresh right after login) rather than a hard dependency for other routes to work.
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'No authentication token provided' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decoded;

    const { uid, email, name, picture, firebase } = decoded;
    req.user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $setOnInsert: {
          firebaseUid: uid,
          name: name || email?.split('@')[0] || 'Student',
          email,
          photoURL: picture || null,
          provider: firebase?.sign_in_provider === 'google.com' ? 'google.com' : 'password',
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    next();
  } catch (err) {
    console.error('Auth verification failed:', err.message);
    res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
};

module.exports = requireAuth;