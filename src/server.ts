// The most first thing you need to load the config
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import Server from 'sosise-core/build/Server/Server';

const server = new Server();

// Shut down gracefully when the process manager asks the application to terminate
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.on(signal, () => {
        server.stop().then(
            () => process.exit(0),
            (error) => {
                console.error(error);
                process.exit(1);
            },
        );
    });
}

// A startup failure must terminate the process instead of becoming an unhandled rejection
server.run().catch((error) => {
    console.error(error);
    process.exit(1);
});
