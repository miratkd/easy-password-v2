import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://192.168.0.183:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
