import express from 'express';
import User from '../models/user.mjs';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return user ? res.json(user) : res.status(404).json({ error: 'Utilisateur non trouvé' });
  } catch {
    return res.status(400).json({ error: 'Requête invalide' });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json(user || {});
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// CREATE user (non sécurisé — réservé aux tests ou admin)
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch {
    return res.status(400).json({ error: 'Requête invalide' });
  }
});

export default router;
