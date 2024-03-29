/* eslint-disable no-undef */
const { defaults } = require('jest-config');

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/cypress/', '/src/tests/e2e'],
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|gif|ttf|otf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'scss', 'js'],
  setupFiles: ['./__setups__/localstorage.js'],
  setupFilesAfterEnv: ['./src/setupTest/setupTest.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
