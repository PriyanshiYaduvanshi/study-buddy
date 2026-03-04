import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// AI endpoints
export const aiAPI = {
  explain: (concept) => api.post('/api/ai/explain', { concept }),
  summarize: (text) => api.post('/api/ai/summarize', { text }),
  quiz: (text) => api.post('/api/ai/quiz', { text }),
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