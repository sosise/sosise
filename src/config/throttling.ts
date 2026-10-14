/**
 * Configuration for request throttling
 */
const throttlingConfig = {
    /**
     * Enables or disables request throttling
     */
    isEnabled: true,

    /**
     * Where the client IP address comes from
     * null takes request.ip, which Express resolves through exactly the proxies HTTP_TRUST_PROXY trusts, so a client cannot forge it
     * A header name reads that header instead, only safe when a trusted proxy overwrites it: the leftmost entry of an appended
     * X-Forwarded-For is whatever the client sent
     */
    clientIpHeader: null,

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
