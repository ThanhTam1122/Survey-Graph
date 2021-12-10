const esModules = ['ky', 'ky-universal'].join('|');

module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  verbose: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules}))/`],
};
