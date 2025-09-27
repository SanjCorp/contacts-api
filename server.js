require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger setup
const swaggerSetup = require("./swagger");
swaggerSetup(app);

// Rutas
const contactsRouter = require('./routes/contacts');
app.use('/api/contacts', contactsRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('🚀 Contacts API is running!');
});

// Conectar DB y arrancar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
