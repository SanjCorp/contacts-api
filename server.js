require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger
swaggerSetup(app);

// Routes
const contactsRouter = require('./routes/contacts');
app.use('/api/contacts', contactsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Contacts API is running!');
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
