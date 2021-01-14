// The most first thing you need to load the config
import dotenv from 'dotenv';
dotenv.config();

import Artisan from 'sosise-core/build/artisan';

const artisan = new Artisan();
artisan.run(process.argv);
