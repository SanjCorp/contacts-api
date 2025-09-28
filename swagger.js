const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "Contacts API - W02 Project",
    },
    servers: [
      {
        url: "https://contacts-api-3m7q.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // Esto apunta a tus rutas para documentarlas
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerSetup;
