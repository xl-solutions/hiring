module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: ["src/**"],
  coverageDirectory: "__tests__/coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js?(x)"],
};
