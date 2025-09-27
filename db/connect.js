const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB conectado con éxito");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;