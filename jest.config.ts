export default {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: {
        module: "esnext",
      },
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};