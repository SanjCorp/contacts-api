require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger
swaggerSetup(app);

// Rutas
const contactsRouter = require('./routes/contacts');
app.use('/api/contacts', contactsRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('🚀 Contacts API is running!');
});

// Conectar a DB y arrancar server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
