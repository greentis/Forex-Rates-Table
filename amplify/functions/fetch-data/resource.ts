import { defineFunction, secret } from "@aws-amplify/backend";

export const fetchData = defineFunction({
  name: "fetch-data",
  entry: "./handler.ts",
  environment: {
    FIXER_API_KEY: secret("FIXER_API_KEY")
  }
});