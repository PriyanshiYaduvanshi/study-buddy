<<<<<<< HEAD
# 🎓 Study Buddy — AI Learning Assistant

A production-ready full-stack AI study app with concept explanations, note summarization, and quiz generation.

## 📁 Folder Structure

```
study-buddy/
├── backend/
│   ├── middleware/
│   │   └── openai.js         # OpenAI helper
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
    │   ├── components/
    │   │   └── layout/
    │   │       ├── Sidebar.jsx
    │   │       ├── Header.jsx
    │   │       └── LoadingDots.jsx
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
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Quick Start

### 1. Clone and set up

```bash
git clone <repo>
cd study-buddy
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
```

**`.env` values:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-buddy
GROQ_API_KEY=gsk_your_groq_api_key_here
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Visit **http://localhost:3000** 🎉

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
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

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, React Markdown
- **Backend**: Node.js, Express 4
- **Database**: MongoDB with Mongoose
- **AI**: Groq API — Llama 3 8B (`groq-sdk`)

## 💡 Features

1. **Explain** — Chat interface with ELI5-style explanations
2. **Summarizer** — Paste notes → get structured bullet-point summary
3. **Quiz Generator** — Auto-generate 5 MCQs with scoring and explanations
4. **Saved Notes** — Browse, search, and manage all saved summaries
5. **Notion-inspired UI** — Clean, warm, minimal design with Fraunces + Instrument Sans fonts
=======
# study-buddy
AI-Powered Study Buddy Web App
>>>>>>> 030c496d610a9a6eea4356407533e75e602fb273
