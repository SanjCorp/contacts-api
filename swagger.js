const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Contacts API - W02 project'
    },
    servers: [
      {
        url: 'https://contacts-api-3m7q.onrender.com', // Cambia al URL de Render
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger tomará comentarios de tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = swaggerSetup;
