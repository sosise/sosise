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
     * Log level, it's like linux permissions
     *
     * Possible log levels are:
     * - 1 CRITICAL
     * - 2 ERROR
     * - 4 WARNING
     * - 8 INFO
     * - 16 DEBUG
     *
     * Example: you want to log INFO and ERROR only: 8 + 2 = 10
     */
    logLevel: process.env.LOGGING_LEVEL || 31,

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
