import express from 'express';
import Event from '../models/event.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { name, dateStart, dateEnd, location } = req.body;
  if (!name || !dateStart || !dateEnd || !location) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const event = await Event.create({
    name,
    dateStart,
    dateEnd,
    location,
    organizers: [req.user._id],
    participants: [req.user._id]
  });

  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find({ isPublic: true });
  res.json(events);
});

router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event introuvable' });
  res.json(event);
});

export default router;
