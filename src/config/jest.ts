import type { Config } from '@jest/types';
import dotenv from 'dotenv';

/**
 * Load .env.testing file when testing
 */
dotenv.config({
    path: './.env.testing'
});

/*
 * Jest configuration, application testing
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
    /**
     * Root directory where to search for tests folder, please note we are talking here of "build" directory
     */
    rootDir: '../',

    /**
     * Automatically clear mock calls and instances between every test
     */
    clearMocks: true,

    /**
     * The directory where Jest should output its coverage files
     */
    coverageDirectory: 'coverage',

    /**
     * Indicates which provider should be used to instrument code for coverage
     */
    coverageProvider: 'v8',
};
export = config;
