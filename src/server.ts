// The most first thing you need to load the config
import dotenv from 'dotenv';
dotenv.config();

import Server from 'sosise-core/build/Server/Server';

const server = new Server();
server.run();
