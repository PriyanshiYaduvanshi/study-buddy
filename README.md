# 🎓 Study Buddy — AI Learning Assistant

A production-ready full-stack AI study app with concept explanations, note summarization, and quiz generation.

## 🌐 Live Demo

🔗 **Frontend:** https://study-buddy-iota-five.vercel.app
⚙️ **Backend:** https://study-buddy-hgdf.onrender.com
📁 **GitHub:** https://github.com/PriyanshiYaduvanshi/study-buddy

---

## ✨ Features

1. **Explain** — Chat interface with ELI5-style explanations
2. **Summarizer** — Paste notes → get structured bullet-point summary
3. **Quiz Generator** — Auto-generate 5 MCQs with scoring and explanations
4. **Saved Notes** — Browse, search, and manage all saved summaries
5. **Notion-inspired UI** — Clean, warm, minimal design

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Tailwind CSS, Lucide Icons, React Markdown |
| **Backend** | Node.js, Express 4 |
| **Database** | MongoDB with Mongoose |
| **AI Model** | Groq API — Llama 3.1 8B Instant |
| **Deployment** | Vercel + Render + MongoDB Atlas |

---

## 📁 Folder Structure

```
study-buddy/
├── backend/
│   ├── middleware/
│   │   └── groq.js           # Groq AI helper
│   ├── models/
│   │   ├── Note.js           # Note schema
│   │   └── Chat.js           # Chat history schema
│   ├── routes/
│   │   ├── ai.js             # /explain, /summarize, /quiz
│   │   ├── notes.js          # CRUD for notes
│   │   └── chat.js           # Chat sessions
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/layout/
    │   │   ├── Sidebar.jsx
    │   │   ├── Header.jsx
    │   │   └── LoadingDots.jsx
    │   ├── hooks/
    │   │   └── useNotes.js
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── ExplainPage.jsx
    │   │   ├── SummarizePage.jsx
    │   │   ├── QuizPage.jsx
    │   │   └── NotesPage.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── index.css
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

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-buddy
GROQ_API_KEY=gsk_your_groq_api_key_here
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```
Backend runs at: `http://localhost:5000` ✅

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000` ✅

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root health check |
| `GET` | `/api/health` | API status |
| `GET` | `/api/ai/test` | Test Groq API key |
| `POST` | `/api/ai/explain` | ELI5 concept explanation |
| `POST` | `/api/ai/summarize` | Bullet-point summary |
| `POST` | `/api/ai/quiz` | Generate 5 MCQs |
| `GET` | `/api/notes` | List all notes |
| `POST` | `/api/notes` | Create a note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |
| `GET` | `/api/chat/:sessionId` | Get chat history |
| `POST` | `/api/chat/:sessionId` | Send chat message |
| `DELETE` | `/api/chat/:sessionId` | Clear chat history |

---

## 🌍 Deployment Guide

### Frontend — Vercel
1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Add Environment Variable:
```
REACT_APP_API_URL=https://study-buddy-hgdf.onrender.com
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
```

### Database — MongoDB Atlas
1. Create free cluster on [mongodb.com/atlas](https://mongodb.com/atlas)
2. Allow all IP access: `0.0.0.0/0`
3. Copy connection string to Render environment variables

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `GROQ_API_KEY` | Groq API key | ✅ |
| `NODE_ENV` | development / production | ✅ |
| `REACT_APP_API_URL` | Backend URL for frontend | ✅ |

> 🔑 Get free Groq API key at [console.groq.com](https://console.groq.com)

---

## 👩‍💻 Author

**Priyanshi Yaduvanshi**
Department of Computer Science & Engineering

---

## 🏆 Acknowledgements

- [AICTE](https://aicte-india.org/) & [Edunet Foundation](https://edunetfoundation.org/) — Internship Program
- [Groq](https://groq.com/) — Free AI inference API
- [Meta AI](https://ai.meta.com/) — Llama 3.1 open-source model
- [Vercel](https://vercel.com/) — Frontend deployment
- [Render](https://render.com/) — Backend deployment
- [MongoDB Atlas](https://mongodb.com/atlas) — Cloud database

---
