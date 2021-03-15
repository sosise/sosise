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
                host: process.env.DB_PROJECT_HOST || null,
                port: Number(process.env.DB_PROJECT_PORT || 3306),
                database: process.env.DB_PROJECT_DATABASE || null,
                user: process.env.DB_PROJECT_USERNAME || null,
                password: process.env.DB_PROJECT_PASSWORD || null,
                // charset: 'utf8mb4',
                // timezone: 'UTC',
            },
            pool: { min: 0, max: 5 },
        },

        /**
         * MSSQL database connection
         *
         * Package is not installed by default!
         * You can install it like following: npm install mssql, npm install -D @types/mssql
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
            requestTimeout: 30000,
        },

        /**
         * SQLITE database connection
         *
         * Package is not installed by default!
         * You can install it like following: npm install sqlite3, npm install -D @types/sqlite3
         */
        sqlite: {
            client: 'sqlite3',
            connection: {
                filename: './mydb.sqlite'
            }
        },
    }
};

export default databaseConfig;
