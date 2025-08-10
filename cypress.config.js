const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/tests/**/*.cy.js",
    supportFile: "cypress/support/e2e.js"
  }
});
