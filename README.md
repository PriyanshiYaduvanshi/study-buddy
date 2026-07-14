# 🎓 Study Buddy — AI Learning Assistant

A production-ready full-stack AI study app with a marketing landing page, full authentication (email/password + Google), concept explanations, note summarization, and quiz generation.

## 🌐 Live Demo

🔗 **Frontend:** https://study-buddy-iota-five.vercel.app
⚙️ **Backend:** https://study-buddy-hgdf.onrender.com
📁 **GitHub:** https://github.com/PriyanshiYaduvanshi/study-buddy

---

## ✨ Features

1. **Landing Page** — Sticky nav, hero, features, how-it-works, testimonials, FAQ, contact CTA, footer
2. **Authentication** — Email/password register & login, with full validation
3. **Login/Register with Google** — One-click sign-in via Firebase Auth; auto-creates an account on first Google sign-in
4. **Protected Routes** — Dashboard only reachable when logged in; logged-in users can't revisit Login/Register
5. **Forgot Password** — Firebase-powered password reset email
6. **Explain** — Chat interface with ELI5-style explanations
7. **Summarizer** — Paste notes → get structured bullet-point summary
8. **Quiz Generator** — Auto-generate 5 MCQs with scoring and explanations
9. **Saved Notes** — Browse, search, and manage all saved summaries
10. **Notion-inspired UI** — Clean, warm, minimal design, consistent across marketing and app pages

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router 6, Tailwind CSS, Lucide Icons, React Markdown |
| **Auth** | Firebase Authentication (Email/Password + Google), firebase-admin (backend token verification) |
| **Backend** | Node.js, Express 4 |
| **Database** | MongoDB with Mongoose |
| **AI Model** | Groq API — Llama 3.1 8B Instant |
| **Deployment** | Vercel + Render + MongoDB Atlas |

---

## 📁 Folder Structure

```
study-buddy/
├── .gitignore
├── README.md
│
├── backend/
│   ├── config/
│   │   └── firebaseAdmin.js       # Firebase Admin SDK init (token verification)
│   ├── middleware/
│   │   ├── auth.js                # Verifies Firebase ID token, attaches req.user
│   │   └── groq.js                # Groq AI helper
│   ├── models/
│   │   ├── User.js                # firebaseUid, name, email, photoURL, provider
│   │   ├── Note.js                # Note schema
│   │   └── Chat.js                # Chat history schema
│   ├── routes/
│   │   ├── auth.js                # POST /sync, GET /me
│   │   ├── ai.js                  # /explain, /summarize, /quiz
│   │   ├── notes.js               # CRUD for notes
│   │   └── chat.js                # Chat sessions
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── AuthLayout.jsx         # Shared chrome for Login/Register/Forgot
    │   │   │   ├── GoogleButton.jsx       # Reusable "Continue with Google" button
    │   │   │   ├── ProtectedRoute.jsx     # Redirects to /login if signed out
    │   │   │   └── PublicOnlyRoute.jsx    # Redirects to /app if already signed in
    │   │   └── layout/
    │   │       ├── Sidebar.jsx            # Nav + user profile/logout
    │   │       ├── Header.jsx
    │   │       └── LoadingDots.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # login, register, loginWithGoogle, logout, resetPassword
    │   ├── hooks/
    │   │   └── useNotes.js
    │   ├── pages/
    │   │   ├── LandingPage.jsx        # Public marketing page
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   ├── Dashboard.jsx          # The app shell (was App.jsx pre-auth)
    │   │   ├── HomePage.jsx
    │   │   ├── ExplainPage.jsx
    │   │   ├── SummarizePage.jsx
    │   │   ├── QuizPage.jsx
    │   │   └── NotesPage.jsx
    │   ├── utils/
    │   │   └── api.js             # Axios instance, attaches Firebase ID token
    │   ├── firebase.js            # Firebase SDK init
    │   ├── App.jsx                # Router shell: AuthProvider + Routes
    │   └── index.css
    ├── .env.example
    ├── vercel.json
    └── package.json
```

---

## 🚀 Quick Start (Run Locally)

### 1. Clone the Repository

```bash
git clone https://github.com/PriyanshiYaduvanshi/study-buddy.git
cd study-buddy
```

### 2. Firebase Setup (one-time, shared by frontend + backend)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. **Build → Authentication → Sign-in method** → enable **Email/Password** and **Google**
3. **Project Settings → General → Your apps** → add a Web app → copy the config values (used in step 3 below)
4. **Project Settings → Service Accounts** → **Generate new private key** → save the downloaded JSON (used in step 4 below)
5. **Authentication → Settings → Authorized domains** → make sure `localhost` is listed (and add your production domain later)

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

```bash
npm start
```
Frontend runs at: `http://localhost:3000` ✅

### 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-buddy
GROQ_API_KEY=gsk_your_groq_api_key_here
NODE_ENV=development

# Paste the entire downloaded service-account JSON as one line, OR use the file-path option:
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...", ...}
# FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
```

```bash
npm run dev
```
Backend runs at: `http://localhost:5000` ✅

### 5. Try it

Visit `http://localhost:3000` → Landing page → **Get started** → register or **Continue with Google** → lands on `/app` (the dashboard) → **Logout** from the sidebar → visiting `/app` directly now redirects to `/login`.

---

## 🔑 API Endpoints

| Method | Endpoint | Auth required | Description |
|--------|----------|:---:|-------------|
| `GET` | `/` | – | Root health check |
| `GET` | `/api/health` | – | API status |
| `POST` | `/api/auth/sync` | ✅ | Upserts the MongoDB user from the verified Firebase token |
| `GET` | `/api/auth/me` | ✅ | Returns the current user's Mongo profile |
| `GET` | `/api/ai/test` | – | Test Groq API key |
| `POST` | `/api/ai/explain` | – | ELI5 concept explanation |
| `POST` | `/api/ai/summarize` | – | Bullet-point summary |
| `POST` | `/api/ai/quiz` | – | Generate 5 MCQs |
| `GET` | `/api/notes` | – | List all notes |
| `POST` | `/api/notes` | – | Create a note |
| `PUT` | `/api/notes/:id` | – | Update a note |
| `DELETE` | `/api/notes/:id` | – | Delete a note |
| `GET` | `/api/chat/:sessionId` | – | Get chat history |
| `POST` | `/api/chat/:sessionId` | – | Send chat message |
| `DELETE` | `/api/chat/:sessionId` | – | Clear chat history |

> Note: `/api/ai`, `/api/notes`, and `/api/chat` are not yet scoped to individual users — they remain exactly as before. Only the new `/api/auth` routes require a valid Firebase token.

---

## 🌍 Deployment Guide

### Frontend — Vercel
1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Add Environment Variables:
```
REACT_APP_API_URL=https://study-buddy-hgdf.onrender.com
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
CI=false
```

### Backend — Render
1. Create Web Service on [render.com](https://render.com)
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
NODE_ENV=production
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account", ...}
```
> Paste the entire service-account JSON as a single-line value — Render doesn't support uploading arbitrary files, so the file-path option only works for local development.

### Database — MongoDB Atlas
1. Create free cluster on [mongodb.com/atlas](https://mongodb.com/atlas)
2. Allow all IP access: `0.0.0.0/0`
3. Copy connection string to Render environment variables
4. No migration needed — the new `User` collection is created automatically on first login/register; existing `Note`/`Chat` data is untouched

### Firebase — Authorized Domains
Add your production Vercel domain under **Authentication → Settings → Authorized domains**, or Google sign-in will fail in production while still working on `localhost`.

---

## 🔐 Environment Variables

**Backend**

| Variable | Description | Required |
|----------|-------------|:---:|
| `PORT` | Backend server port | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `GROQ_API_KEY` | Groq API key | ✅ |
| `NODE_ENV` | development / production | ✅ |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Full service-account JSON as a string (recommended for Render) | ✅* |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to service-account JSON file (local dev alternative) | ✅* |

\* One of these two is required.

**Frontend**

| Variable | Description | Required |
|----------|-------------|:---:|
| `REACT_APP_API_URL` | Backend URL for frontend | ✅ |
| `REACT_APP_FIREBASE_API_KEY` | Firebase Web app config | ✅ |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Web app config | ✅ |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Web app config | ✅ |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Web app config | ✅ |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Web app config | ✅ |
| `REACT_APP_FIREBASE_APP_ID` | Firebase Web app config | ✅ |

> 🔑 Get free Groq API key at [console.groq.com](https://console.groq.com)
> 🔑 Get Firebase config/keys at [console.firebase.google.com](https://console.firebase.google.com)

---

## 👩‍💻 Author

**Priyanshi Yaduvanshi**
Department of Computer Science & Engineering

---

## 🏆 Acknowledgements

- [AICTE](https://aicte-india.org/) & [Edunet Foundation](https://edunetfoundation.org/) — Internship Program
- [Groq](https://groq.com/) — Free AI inference API
- [Meta AI](https://ai.meta.com/) — Llama 3.1 open-source model
- [Firebase](https://firebase.google.com/) — Authentication
- [Vercel](https://vercel.com/) — Frontend deployment
- [Render](https://render.com/) — Backend deployment
- [MongoDB Atlas](https://mongodb.com/atlas) — Cloud database

---
