const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const requireAuth = require('../middleware/auth');
const { chatWithHistory } = require('../middleware/groq');

const SYSTEM_PROMPT = `You are Study Buddy, a friendly and knowledgeable AI tutor. 
You help students understand complex topics clearly and encouragingly.
Keep answers focused, educational, and appropriately detailed.
Use examples and analogies when helpful. Use markdown for formatting when it aids clarity.`;

// All chat routes require a logged-in user — sessions are always scoped to req.user._id,
// so two users can never read or write each other's chat history even with the same sessionId.
router.use(requireAuth);

// GET /api/chat/:sessionId — get MY chat history for this session
router.get('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId, userId: req.user._id });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chat/:sessionId — send a message in MY session
router.post('/:sessionId', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'message is required' });

    // Get or create chat session — always scoped to the authenticated user
    let chatSession = await Chat.findOne({ sessionId: req.params.sessionId, userId: req.user._id });
    if (!chatSession) {
      chatSession = new Chat({ sessionId: req.params.sessionId, userId: req.user._id, messages: [] });
    }

    // Add user message
    chatSession.messages.push({ role: 'user', content: message });

    // Prepare history for OpenAI (last 20 messages)
    const history = chatSession.messages.slice(-20).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Get AI response
    const aiResponse = await chatWithHistory(SYSTEM_PROMPT, history);

    // Save assistant response
    chatSession.messages.push({ role: 'assistant', content: aiResponse });
    await chatSession.save();

    res.json({ reply: aiResponse, messages: chatSession.messages });
  } catch (err) {
    console.error('/chat error:', err.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// DELETE /api/chat/:sessionId — clear MY chat history for this session
router.delete('/:sessionId', async (req, res) => {
  try {
    await Chat.findOneAndDelete({ sessionId: req.params.sessionId, userId: req.user._id });
    res.json({ message: 'Chat cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;