const documentation = {
    /**
     * Configure wether documentation should be protected with basic auth
     */
    basicAuth: {
        enabled: true,
        user: process.env.DOCUMENTATION_BASIC_AUTH_USER,
        pass: process.env.DOCUMENTATION_BASIC_AUTH_PASS
    }
};

export default documentation;
