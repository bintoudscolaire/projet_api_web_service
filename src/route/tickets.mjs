import express from 'express';
import mongoose from 'mongoose';
import Ticket from '../models/ticket.mjs';
import Event from '../models/event.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

/**
 * POST /tickets/events/:eventId/types
 * Création d'un type de billet pour un événement
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

/**
 * POST /tickets/types/:typeId/buy
 * Achat d'un billet
 */
router.post('/types/:typeId/buy', requireAuth, async (req, res) => {
  try {
    const { typeId } = req.params;
    const { firstname, lastname, address } = req.body;

    if (!firstname || !lastname || !address) {
      return res.status(400).json({
        error: 'firstname, lastname et address sont requis'
      });
    }

    if (!mongoose.isValidObjectId(typeId)) {
      return res.status(400).json({ error: 'ID type de billet invalide' });
    }

    const ticketType = await Ticket.findById(typeId);
    if (!ticketType) {
      return res.status(404).json({ error: 'Type de billet introuvable' });
    }

    if (ticketType.quantity <= 0) {
      return res.status(400).json({ error: 'Plus de billets disponibles' });
    }

    // Décrémenter le stock
    ticketType.quantity -= 1;
    await ticketType.save();

    res.status(201).json({
      message: 'Billet acheté avec succès',
      buyer: {
        firstname,
        lastname,
        address
      },
      ticketType
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
