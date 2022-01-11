const loggingConfig = {
    /**
     * Enables logging to files
     */
    enableLoggingToFiles: true,

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
