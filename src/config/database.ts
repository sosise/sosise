const databaseConfig = {
    /**
     * Default database connection, it is used for migrations
     */
    default: process.env.DEFAULT_DB_CONNECTION,

    /**
     * Specify all project database connections
     */
    connections: {
        /**
         * Project database connection
         */
        project: {
            client: 'mysql',
            connection: {
                host: process.env.DB_PROJECT_HOST || 'localhost',
                port: Number(process.env.DB_PROJECT_PORT || 3306),
                database: process.env.DB_PROJECT_DATABASE || 'sosise',
                user: process.env.DB_PROJECT_USERNAME || 'root',
                password: process.env.DB_PROJECT_PASSWORD || 'root',
                // charset: 'utf8mb4',
                // timezone: 'UTC',
            },
            /**
             * Knex uses Tarn.js for pooling
             * You can read more about it's configuration params here: https://github.com/vincit/tarn.js
             */
            pool: {
                min: 0,
                max: 5,
                // createTimeoutMillis: 60000,
                // acquireTimeoutMillis: 60000,
                // idleTimeoutMillis: 60000,
                // reapIntervalMillis: 2000,
                // createRetryIntervalMillis: 200,
                // propagateCreateError: false,
            }
        },

        /**
         * MSSQL database connection
         */
        mssql: {
            client: 'mssql',
            connection: {
                server: 'someserver',
                port: 1433,
                database: 'database',
                user: 'username',
                password: 'password',
                options: {
                    enableArithAbort: true,
                    encrypt: false
                },
                // charset: 'utf8mb4',
                // timezone: 'UTC',
            },
            // requestTimeout: 30000,
        },

        /**
         * SQLITE database connection
         */
        sqlite: {
            client: 'sqlite3',
            connection: {
                filename: process.env.SQLITE_FILE_PATH || './mydb.sqlite'
            },
            useNullAsDefault: true,
        },
    }
};

export default databaseConfig;
