import express from 'express';
import mongoose from 'mongoose';
import Poll from '../models/poll.mjs';
import Event from '../models/event.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

/**
 * POST /polls/events/:eventId
 * Création d’un sondage pour un événement
 */
router.post('/events/:eventId', requireAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, questions } = req.body;

    if (!mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({ error: 'ID événement invalide' });
    }

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        error: 'title et questions sont requis'
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Événement introuvable' });
    }

    // 👉 on prend la première question pour satisfaire le schema
    const mainQuestion = questions[0]?.question;
    if (!mainQuestion) {
      return res.status(400).json({
        error: 'Chaque question doit contenir un champ "question"'
      });
    }

    const poll = await Poll.create({
      title,
      question: mainQuestion, // 👈 OBLIGATOIRE selon ton model
      questions: questions.map(q => ({
        question: q.question,
        options: q.answers.map(a => ({
          text: a,
          votes: []
        }))
      })),
      event: eventId,
      createdBy: req.user.id // 👈 OBLIGATOIRE selon ton model
    });

    res.status(201).json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
