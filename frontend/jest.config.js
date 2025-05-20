module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",              // Skip entry point
    "!src/reportWebVitals.js",    // Skip if you have this
    "!src/setupTests.js",         // Skip setup file
    "!src/**/serviceWorker.js",   // Skip service workers
    "!src/**/__tests__/**"        // Skip raw test files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "text-summary"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
