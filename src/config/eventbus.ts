const eventbusConfig = {
    /**
     * Driver to use for EventBus
     * - 'memory': Events within single process (Node.js EventEmitter)
     * - 'redis': Distributed events with guaranteed delivery via Redis
     */
    driver: process.env.EVENTBUS_DRIVER || 'memory',

    /**
     * Driver-specific configurations
     */
    driverConfiguration: {
        /**
         * Redis configuration
         */
        redis: {
            /**
             * Redis server hostname or IP address
             * Default: 'redis'
             */
            host: process.env.EVENTBUS_REDIS_HOST || 'redis',

            /**
             * Redis server port
             * Default: 6379
             */
            port: Number(process.env.EVENTBUS_REDIS_PORT || 6379),

            /**
             * Redis authentication password (optional)
             * Leave undefined if Redis has no password
             */
            password: process.env.EVENTBUS_REDIS_PASSWORD || undefined,

            /**
             * Redis database number
             * Select the Redis database to use (0-15)
             * Default: 0
             */
            db: Number(process.env.EVENTBUS_REDIS_DB || 0),

            /**
             * Service name for this microservice
             * Used to track durable message positions independently per service
             * Each service maintains its own position tracking
             * Default: 'default-service'
             */
            serviceName: process.env.EVENTBUS_SERVICE_NAME || 'default-service',

            /**
             * IMPORTANT NOTES:
             * - Redis EventBus provides guaranteed message delivery
             * - All emit() calls save messages to Redis Lists for durability
             * - Subscribers choose delivery mode:
             *   - on(): temporary subscription (only new messages via pub/sub)
             *   - onDurable(): persistent subscription, returns a promise, await it during
             *     startup to know the subscription is live, ignore it to fire and forget
             * - Supports wildcard patterns: 'user.*' matches 'user.created', 'user.updated', etc.
             * - Pattern '**' can be used for multi-level wildcards
             * - Data persistence:
             *   - Durable events: stored in Redis Lists as 'durable:{event_name}'
             *   - Live events: published via pub/sub as 'live:{event_name}'
             *   - Durable progress: stored as 'position:durable:{event_name}:{serviceName}'
             * - Durable delivery semantics:
             *   - Durable handlers are fed only by the stored position, never directly by
             *     the live channel, a live event just wakes the reader up
             *   - The position advances only after the handler returned, a failing handler
             *     gets the event again on the next wake-up
             *   - Delivery is at-least-once, so durable handlers must be idempotent
             *   - The position is shared by every durable handler of the same event, so
             *     register all durable subscriptions during startup, a handler added later
             *     does not receive the history already consumed by the others
             * - Automatic reconnection with exponential backoff (100ms to 3s)
             * - Subscriptions are restored by the Redis client after reconnection, durable
             *   readers catch up with whatever was emitted while the connection was down
             */
        },
    },
};

export default eventbusConfig;
