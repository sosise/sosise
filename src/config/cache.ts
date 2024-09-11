const cacheConfig = {
    /**
     * Which cache driver should be used
     *
     * Possible drivers are:
     * - fs (Filesystem is used for cache)
     * - memory (RAM is used for cache)
     * - redis
     *
     * Please aware that "fs" cache is a slow cache, especially when you are dealing with big amount of data.
     * It can be used for debugging and as a central cache.
     *
     * When using "fs" driver it is recommended to use tmpfs for the cache directory:
     *  On host system:
     *  - mount -t tmpfs -o size=1g tmpfs /mnt/my_shared_tmpfs
     *  - vim /etc/fstab
     *    tmpfs /mnt/my_shared_tmpfs tmpfs size=1G 0 0
     *
     * In docker-compose.yml:
     *  [...]
     *  volumes:
     *      - /mnt/my_shared_tmpfs:/var/www/app/storage/cache
     *  [...]
     */
    driver: process.env.CACHE_DRIVER || 'memory',

    /**
     * Default cache TTL (time to live)
     */
    defaultTTLInSeconds: process.env.CACHE_DEFAULT_TTL || 600,

    /**
     * Checkperiod, the time when the cache service will remove expired cache items in seconds
     */
    checkperiodInSeconds: 60,

    /**
     * Driver configuration
     */
    driverConfiguration: {
        memory: {
            // No configuration
        },
        fs: {
            filePath: process.cwd() + '/storage/cache/cache.json'
        },
        redis: {
            host: process.env.CACHE_REDIS_HOST || 'redis',
            port: Number(process.env.CACHE_REDIS_PORT || 6379),
        },
    }
};

export default cacheConfig;
