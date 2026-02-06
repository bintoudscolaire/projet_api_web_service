import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Routes
import authRoutes from './middleware/auth.mjs';
import userRoutes from './controllers/routes.mjs';
import groupRoutes from './route/groups.mjs';
import eventRoutes from './route/events.mjs';
import threadRoutes from './route/threads.mjs';
import albumRoutes from './route/albums.mjs';
import pollRoutes from './route/polls.mjs';
import ticketRoutes from './route/tickets.mjs';

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.config = {
      port: process.env.PORT || 3000,
      mongodb: process.env.MONGODB_URI
    };
  }

  async dbConnect() {
    await mongoose.connect(this.config.mongodb);
    console.log('[CONNECTED] MongoDB connecté');
  }

  middleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/auth', authRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/groups', groupRoutes);
    this.app.use('/events', eventRoutes);
    this.app.use('/threads', threadRoutes);
    this.app.use('/albums', albumRoutes);
    this.app.use('/polls', pollRoutes);
    this.app.use('/tickets', ticketRoutes);

    this.app.use((req, res) => {
      res.status(404).json({ code: 404, message: 'Not Found' });
    });
  }

  async run() {
    await this.dbConnect();
    this.middleware();
    this.routes();

    this.app.listen(this.config.port, () => {
      console.log(`[SERVER] Listening on port ${this.config.port}`);
    });
  }
}

export default Server;
