import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  timeout: 30000,
});

// AI endpoints
export const aiAPI = {
  explain: (concept) => api.post('/ai/explain', { concept }),
  summarize: (text) => api.post('/ai/summarize', { text }),
  quiz: (text) => api.post('/ai/quiz', { text }),
};

// Notes endpoints
export const notesAPI = {
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

// Chat endpoints
export const chatAPI = {
  getHistory: (sessionId) => api.get(`/chat/${sessionId}`),
  sendMessage: (sessionId, message) => api.post(`/chat/${sessionId}`, { message }),
  clearHistory: (sessionId) => api.delete(`/chat/${sessionId}`),
};

export default api;
