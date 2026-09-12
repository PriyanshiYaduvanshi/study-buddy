const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Fast, capable, free model on Groq
const MODEL = 'openai/gpt-oss-20b';

/**
 * Single-turn: system prompt + one user message → string reply
 * maxTokens defaults to 1024, but callers generating longer output (e.g. large quizzes)
 * can request more room.
 */
const chat = async (systemPrompt, userMessage, temperature = 0.7, maxTokens = 1024) => {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature,
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userMessage  },
    ],
  });
  return completion.choices[0].message.content.trim();
};

/**
 * Multi-turn: system prompt + message history → string reply
 */
const chatWithHistory = async (systemPrompt, messages) => {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.7,
    max_tokens: 1024,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    ],
  });
  return completion.choices[0].message.content.trim();
};

module.exports = { chat, chatWithHistory };