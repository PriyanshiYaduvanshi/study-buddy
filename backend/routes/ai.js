const express = require('express');
const router = express.Router();
const { chat } = require('../middleware/groq');

// Helper — prints full error details to terminal
const logError = (route, err) => {
  console.error('\n─────────────────────────────────────');
  console.error(`❌ ERROR in ${route}`);
  console.error(`   Message : ${err.message}`);
  console.error(`   Status  : ${err.status || err.statusCode || 'N/A'}`);
  console.error('─────────────────────────────────────\n');
};

// GET /api/ai/test — paste this in browser to test your API key
router.get('/test', async (req, res) => {
  try {
    console.log('🧪 Testing Groq API key...');
    const response = await chat('You are a helpful assistant.', 'Say exactly: API connection successful!');
    console.log('✅ Groq API test passed:', response);
    res.json({ status: '✅ SUCCESS — API key is working!', response });
  } catch (err) {
    logError('/test', err);
    res.status(500).json({ status: '❌ FAILED', error: err.message });
  }
});

// POST /api/ai/explain
router.post('/explain', async (req, res) => {
  try {
    const { concept } = req.body;
    if (!concept) return res.status(400).json({ error: 'concept is required' });

    const system = `You are a friendly tutor who explains complex concepts in the simplest possible way.
Use the ELI5 (Explain Like I'm 5) approach: short sentences, relatable analogies, and everyday examples.
Format your response with:
1. A one-sentence TLDR
2. A simple explanation (3-5 sentences with an analogy)
3. A real-world example
Keep the total response under 200 words.`;

    const response = await chat(system, `Explain this concept simply: ${concept}`);
    res.json({ explanation: response });
  } catch (err) {
    logError('/explain', err);
    res.status(500).json({ error: err.message || 'Failed to generate explanation' });
  }
});

// POST /api/ai/summarize
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    const system = `You are an expert at condensing information. Summarize the provided text into clear,
concise bullet points.
Format:
- Start with a 1-sentence overview
- Then provide 5-8 key bullet points
- End with a "Key Takeaway" line
Use markdown formatting (bold for important terms).`;

    const response = await chat(system, `Summarize this text:\n\n${text}`, 0.5);
    res.json({ summary: response });
  } catch (err) {
    logError('/summarize', err);
    res.status(500).json({ error: err.message || 'Failed to generate summary' });
  }
});

// POST /api/ai/quiz
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];
const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 50;

const difficultyGuidance = {
  easy: 'Keep questions beginner-friendly — test recall of core definitions and basic concepts. Avoid tricky wording.',
  medium: 'Test applied understanding — questions should require connecting two or more concepts, not just recall.',
  hard: 'Make questions genuinely challenging — edge cases, subtle distinctions, multi-step reasoning, or comparing closely related concepts.',
};

router.post('/quiz', async (req, res) => {
  try {
    const { topic, numQuestions, difficulty } = req.body;

    // Validation — mirrors the frontend's checks so the API is safe even if called directly.
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const count = Number(numQuestions);
    if (!Number.isInteger(count) || count < MIN_QUESTIONS || count > MAX_QUESTIONS) {
      return res.status(400).json({ error: `Number of questions must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}` });
    }

    const level = (difficulty || '').toLowerCase();
    if (!VALID_DIFFICULTIES.includes(level)) {
      return res.status(400).json({ error: 'Difficulty must be one of: easy, medium, hard' });
    }

    const system = `You are a quiz generator. Create exactly ${count} multiple-choice questions on the topic "${topic.trim()}"
at a ${level.toUpperCase()} difficulty level. ${difficultyGuidance[level]}
Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correctAnswer": "A) Option 1",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}
The "questions" array must contain exactly ${count} items, numbered 1 to ${count}.`;

    // Roughly ~110 tokens per question (question + 4 options + explanation) plus headroom.
    const maxTokens = Math.min(8000, 800 + count * 130);

    const response = await chat(system, `Generate the quiz now: topic="${topic.trim()}", questions=${count}, difficulty=${level}.`, 0.6, maxTokens);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI did not return valid JSON — try again');
    const quizData = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      throw new Error('AI did not return any questions — try again');
    }

    res.json({ ...quizData, topic: topic.trim(), difficulty: level });
  } catch (err) {
    logError('/quiz', err);
    res.status(500).json({ error: err.message || 'Failed to generate quiz' });
  }
});

module.exports = router;