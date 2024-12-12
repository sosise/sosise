// The most first thing you need to load the config
import dotenv from 'dotenv';
import Artisan from 'sosise-core/build/artisan';

dotenv.config();

const artisan = new Artisan();
artisan.run(process.argv);
