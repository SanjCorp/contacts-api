const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
const { initDb } = require('./db/connect');

// Middleware
app.use(express.json());

// Rutas
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// Conexión a Mongo y levantar servidor
initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
