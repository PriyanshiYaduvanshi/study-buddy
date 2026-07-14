import axios from 'axios';
import { auth } from '../firebase';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Attach the current Firebase ID token to every outgoing request, if signed in.
// The backend verifies this token (see backend/middleware/auth.js) to identify req.user.
api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints — sync mirrors the Firebase profile into MongoDB after login/register
export const authAPI = {
  sync: () => api.post('/api/auth/sync'),
  me: () => api.get('/api/auth/me'),
};

// AI endpoints
export const aiAPI = {
  explain: (concept) => api.post('/api/ai/explain', { concept }),
  summarize: (text) => api.post('/api/ai/summarize', { text }),
  quiz: (topic, numQuestions, difficulty) => api.post('/api/ai/quiz', { topic, numQuestions, difficulty }),
};

// Notes endpoints
export const notesAPI = {
  getAll: () => api.get('/api/notes'),
  getById: (id) => api.get(`/api/notes/${id}`),
  create: (data) => api.post('/api/notes', data),
  update: (id, data) => api.put(`/api/notes/${id}`, data),
  delete: (id) => api.delete(`/api/notes/${id}`),
};

// Chat endpoints
export const chatAPI = {
  getHistory: (sessionId) => api.get(`/api/chat/${sessionId}`),
  sendMessage: (sessionId, message) => 
    api.post(`/api/chat/${sessionId}`, { message }),
  clearHistory: (sessionId) => 
    api.delete(`/api/chat/${sessionId}`),
};

export default api;