const queueConfig = {
    /**
     * Redis connection
     */
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    },
};

export default queueConfig;
