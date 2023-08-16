// The most first thing you need to load the config
import dotenv from 'dotenv';
import Server from 'sosise-core/build/Server/Server';

dotenv.config();

const server = new Server();
server.run();
