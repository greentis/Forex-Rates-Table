import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { fetchData } from "../functions/fetch-data/resource";

// Define the response type properly
const schema = a.schema({
  // Define the rates as a nested object
  ExchangeRates: a.customType({
    success: a.boolean(),
    timestamp: a.integer(),
    base: a.string(),
    date: a.string(),
    rates: a.json()
  }),
  
  fetchData: a.query()
    .returns(a.ref('ExchangeRates')) // Use the typed reference
    .handler(a.handler.function(fetchData))
    .authorization(allow => [allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});