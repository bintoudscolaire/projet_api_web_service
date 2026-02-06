import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/album.mjs';
import requireAuth from '../middleware/requireAuth.mjs';

const router = express.Router();

router.post('/events/:eventId', requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.eventId))
    return res.status(400).json({ error: 'ID invalide' });

  const album = await Album.create({
    title: req.body.title,
    images: req.body.images ?? [],
    event: req.params.eventId,
    createdBy: req.user.id
  });

  res.status(201).json(album);
});

router.get('/events/:eventId', async (req, res) => {
  const albums = await Album.find({ event: req.params.eventId });
  res.json(albums);
});

export default router;
