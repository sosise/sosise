/**
 * Configuration for request throttling
 */
const throttlingConfig = {
    /**
     * Enables or disables request throttling
     */
    isEnabled: true,

    /**
     * The HTTP header used to determine the client's IP address
     * This header must be set by a trusted proxy or load balancer, do not accept an arbitrary header value directly from the client
     */
    clientIpHeader: 'X-Forwarded-For',

    /**
     * List of CIDR subnets that are skipped (not throttled)
     */
    skipSubnets: ['10.0.0.0/24'],

    /**
     * Array of route-specific throttling rules
     */
    routeRules: [
        {
            httpMethod: 'GET',
            path: '/customer/get-all-customers',
            maxRequestsPerMinute: 5,
        },
        {
            httpMethod: 'GET',
            path: '/customer/:id',
            maxRequestsPerMinute: 10,
        },
    ],
};

export default throttlingConfig;
