const queueConfig = {
    /**
     * Redis connection
     */
    redis: {
        host: process.env.QUEUE_REDIS_HOST || 'redis',
        port: Number(process.env.QUEUE_REDIS_PORT) || 6379,
    },
};

export default queueConfig;
