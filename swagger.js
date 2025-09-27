const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API para gestionar contactos",
    },
    servers: [
      {
        url: "https://contacts-api-3m7q.onrender.com", // tu URL de Render
      },
    ],
  },
  apis: ["./routes/*.js"], // archivos donde defines tus endpoints
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
