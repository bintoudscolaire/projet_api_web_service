import express from 'express';
import mongoose from 'mongoose';
import Thread from '../models/thread.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

// POST message in group
router.post('/groups/:groupId/threads', requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.groupId)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const thread = await Thread.create({
    content: req.body.content,
    author: req.user._id,
    group: req.params.groupId
  });

  res.status(201).json(thread);
});

// GET group threads
router.get('/groups/:groupId', async (req, res) => {
  const threads = await Thread.find({ group: req.params.groupId });
  res.json(threads);
});

// GET event threads
router.get('/events/:eventId', async (req, res) => {
  const threads = await Thread.find({ event: req.params.eventId });
  res.json(threads);
});

export default router;
