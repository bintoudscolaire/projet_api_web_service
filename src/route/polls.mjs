import express from 'express';
import mongoose from 'mongoose';
import Poll from '../models/poll.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

router.post('/events/:eventId', requireAuth, async (req, res) => {
  const poll = await Poll.create({
    question: req.body.question,
    options: req.body.options.map(o => ({ text: o, votes: [] })),
    event: req.params.eventId,
    createdBy: req.user.id
  });

  res.status(201).json(poll);
});

router.post('/:pollId/vote', requireAuth, async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  if (!poll) return res.status(404).json({ error: 'Poll introuvable' });

  poll.options[req.body.optionIndex].votes.push(req.user.id);
  await poll.save();

  res.json(poll);
});

router.get('/events/:eventId', async (req, res) => {
  const polls = await Poll.find({ event: req.params.eventId });
  res.json(polls);
});

export default router;
