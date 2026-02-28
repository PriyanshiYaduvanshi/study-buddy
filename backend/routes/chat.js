const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { chatWithHistory } = require('../middleware/groq');

const SYSTEM_PROMPT = `You are Study Buddy, a friendly and knowledgeable AI tutor. 
You help students understand complex topics clearly and encouragingly.
Keep answers focused, educational, and appropriately detailed.
Use examples and analogies when helpful. Use markdown for formatting when it aids clarity.`;

// GET /api/chat/:sessionId — get chat history
router.get('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chat/:sessionId — send message
router.post('/:sessionId', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'message is required' });

    // Get or create chat session
    let chatSession = await Chat.findOne({ sessionId: req.params.sessionId });
    if (!chatSession) {
      chatSession = new Chat({ sessionId: req.params.sessionId, messages: [] });
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

// DELETE /api/chat/:sessionId — clear chat
router.delete('/:sessionId', async (req, res) => {
  try {
    await Chat.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
