const loggingConfig = {
    /**
     * Enables logging to console (would log to docker-compose logs)
     */
    enableLoggingToConsole: process.env.LOGGING_TO_CONSOLE_ENABLE === 'true',

    /**
     * Enables logging to files
     * Attention! This would only work if enableLogging is set to true
     */
    enableLoggingToFiles: process.env.LOGGING_TO_FILES_ENABLE === 'true',

    /**
     * Directory where file logs should be stored
     */
    logFilesDirectory: process.cwd() + '/storage/logs',

    /**
     * Logging channels
     * Use them to separate different logs to different files
     */
    channels: {
        /**
         * Default channel where all logs will be written when no channel is specified when using log functions
         */
        default: {
            logFileNamePrefix: 'sosise'
        },

        /**
         * Example channel, use it like: TODO
         */
        example: {
            logFileNamePrefix: 'example'
        },
    }
};

export default loggingConfig;
