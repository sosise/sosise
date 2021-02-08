import type { Config } from '@jest/types';

/**
 * Override your environment variables here (they will be overriden when testing)
 */
process.env.APP_ENV = 'test';

/*
 * Jest configuration (TEST)
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
    // Root directory where to search for tests folder, please note we are talking here of "build" directory
    rootDir: '../',

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
};
export = config;
