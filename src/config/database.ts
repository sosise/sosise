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
            },
            pool: { min: 0, max: 5 }
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
                }
            }
        },

        /**
         * SQLITE database connection
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
