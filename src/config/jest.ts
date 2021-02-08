import type {Config} from '@jest/types';

/**
 * Set you env variables here
 */
process.env.APP_ENV = 'test';

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of paths to directories that Jest should use to search for files in
  roots: [
      "<rootDir>/build"
  ]
};
export default config;
