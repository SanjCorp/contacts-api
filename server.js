// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const swaggerSetup = require('./swagger');

const app = express();
app.use(express.json());

swaggerSetup(app);
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => res.send('🚀 Contacts API is running!'));

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
