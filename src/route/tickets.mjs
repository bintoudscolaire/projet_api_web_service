import express from 'express';
import mongoose from 'mongoose';
import Ticket from '../models/ticket.mjs';
import Event from '../models/event.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

/**
 * POST /tickets/events/:eventId/types
 * Créer un type de billet pour un event
 */
router.post('/events/:eventId/types', requireAuth, async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({ error: 'ID event invalide' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event introuvable' });
    }

    const { name, price, quantity } = req.body;

    if (!name || price == null || quantity == null) {
      return res.status(400).json({
        error: 'name, price et quantity sont requis'
      });
    }

    const ticketType = await Ticket.create({
      name,
      price,
      quantity,
      event: event._id
    });

    res.status(201).json(ticketType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
