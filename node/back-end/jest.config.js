module.exports = {
    bail: false,
    clearMocks: true,
    collectCoverageFrom: ["src/**"],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    testMatch: ["**/*.test.js?(x)"],
  };