import express from 'express';
import mongoose from 'mongoose';
import Group from '../models/group.mjs';
import Event from '../models/event.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

// CREATE GROUP
router.post('/', requireAuth, async (req, res) => {
  const { name, description, type } = req.body;
  if (!name) return res.status(400).json({ error: 'name requis' });

  const group = await Group.create({
    name,
    description,
    type: type ?? 'public',
    admins: [req.user._id],
    members: [req.user._id]
  });

  res.status(201).json(group);
});

// LIST GROUPS
router.get('/', async (req, res) => {
  const groups = await Group.find({ type: 'public' });
  res.json(groups);
});

// GET GROUP
router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });

  res.json(group);
});

// CREATE EVENT IN GROUP (OBLIGATOIRE TP)
router.post('/:groupId/events', requireAuth, async (req, res) => {
  const { groupId } = req.params;

  if (!mongoose.isValidObjectId(groupId)) {
    return res.status(400).json({ error: 'ID groupe invalide' });
  }

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ error: 'Groupe introuvable' });

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
    participants: [req.user._id],
    group: group._id
  });

  res.status(201).json(event);
});

export default router;
