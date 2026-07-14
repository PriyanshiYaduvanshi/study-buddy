const admin = require('firebase-admin');

// Uses a service account key (Firebase Console > Project Settings > Service Accounts > Generate new private key).
// Locally: point FIREBASE_SERVICE_ACCOUNT_KEY at the downloaded JSON, or paste its contents into the env var directly
// (recommended for Render/production, since most hosts don't support uploading arbitrary files).
if (!admin.apps.length) {
  let credential;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // Env var holds the raw JSON contents of the service account key.
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    credential = admin.credential.cert(serviceAccount);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    // Local dev fallback: path to the downloaded JSON file (kept out of git via .gitignore).
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    credential = admin.credential.cert(serviceAccount);
  } else {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY (JSON string) or FIREBASE_SERVICE_ACCOUNT_PATH (file path) in your .env'
    );
  }

  admin.initializeApp({ credential });
}

module.exports = admin;
