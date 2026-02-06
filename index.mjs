import dotenv from 'dotenv';
dotenv.config(); 

import Server from './src/server.mjs';

const server = new Server();
server.run();
