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
     * Log rotation settings
     * Rotation runs on application startup and periodically (every checkIntervalHours)
     */
    rotation: {
        /**
         * Enable automatic log rotation
         */
        enabled: true,

        /**
         * Maximum size of a single log file in megabytes
         * When the active log file exceeds this, it is rotated (renamed with a numeric suffix and compressed)
         * A new empty file takes its place automatically on next write
         * Set to 0 to disable size-based rotation of active files
         */
        maxFileSizeMb: 50,

        /**
         * Compress (gzip) log files older than this many days
         * Rotated chunks from the current day (e.g. sosise-2026-03-17.1.log) are compressed immediately
         * Set to 0 to compress all non-active files immediately
         */
        compressAfterDays: 1,

        /**
         * Delete log files (including compressed) older than this many days
         */
        maxAgeDays: 14,

        /**
         * Maximum total size of log directory in megabytes (including compressed files)
         * When exceeded, oldest files are deleted first
         * The currently active log file is NEVER deleted
         */
        maxTotalSizeMb: 500,

        /**
         * How often to check for rotation in hours
         * Also runs once on application startup
         */
        checkIntervalHours: 1,
    },

    /**
     * Logging channels
     * Use them to separate different logs to different files
     */
    channels: {
        /**
         * Default channel where all logs will be written when no channel is specified when using log functions
         */
        default: {
            logFileNamePrefix: 'sosise',
        },

        /**
         * Example channel, use it like: logger.info('message', data, 'example')
         */
        example: {
            logFileNamePrefix: 'example',
        },

        /**
         * Cache channel for cache-related logs
         */
        cache: {
            logFileNamePrefix: 'cache',
        },

        /**
         * EventBus channel for event bus-related logs
         */
        eventbus: {
            logFileNamePrefix: 'eventbus',
        },
    },
};

export default loggingConfig;
