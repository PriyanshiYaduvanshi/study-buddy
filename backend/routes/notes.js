const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const requireAuth = require('../middleware/auth');

// All notes routes require a logged-in user — every query below is scoped to req.user._id.
router.use(requireAuth);

// GET /api/notes — get all of MY notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/notes/:id — get a single note, only if it's mine
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/notes — create a note owned by me
// Note: userId always comes from req.user (the verified token), never from req.body —
// a client can never create a note on someone else's behalf.
router.post('/', async (req, res) => {
  try {
    const { title, content, summary, tags, color } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const note = await Note.create({ userId: req.user._id, title, content, summary, tags, color });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/notes/:id — update a note, only if it's mine
router.put('/:id', async (req, res) => {
  try {
    // Strip userId from the body in case a client tries to send one — ownership never changes.
    const { userId, ...updates } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/notes/:id — delete a note, only if it's mine
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;