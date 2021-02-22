const loggingConfig = {
    /**
     * Enables logging to file
     */
    enableLoggingToFile: true,

    /**
     * Directory where file logs should be stored
     */
    logFilesDirectory: process.cwd() + '/storage/logs',

    /**
     * Specify wether colorized output should be used in log files
     */
    useColorizedOutputInLogFiles: false,
};

export default loggingConfig;
