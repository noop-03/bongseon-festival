import type { Config } from "jest";

const config: Config = {
  rootDir: "..",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup-tests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^next/(.*)$": "<rootDir>/node_modules/next/$1",
  },
  testMatch: ["**/?(*.)+(spec|test).(ts|tsx)"]
};

export default config;
