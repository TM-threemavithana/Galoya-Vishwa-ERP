export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
  // This ensures Jest doesn't try to run the utility files as tests
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/utils/'],
  // This ensures globals like jest are available
  injectGlobals: true
};