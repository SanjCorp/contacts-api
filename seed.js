require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const contacts = [
  {
    firstName: "Ricardo",
    lastName: "Sanjines",
    email: "ricardo@example.com",
    favoriteColor: "blue",
    birthday: "1995-05-01"
  },
  {
    firstName: "Ana",
    lastName: "Torres",
    email: "ana@example.com",
    favoriteColor: "red",
    birthday: "1997-07-14"
  },
  {
    firstName: "Luis",
    lastName: "Mendoza",
    email: "luis@example.com",
    favoriteColor: "green",
    birthday: "1992-12-22"
  },
  {
    firstName: "María",
    lastName: "Fernández",
    email: "maria@example.com",
    favoriteColor: "yellow",
    birthday: "1999-03-09"
  },
  {
    firstName: "Carlos",
    lastName: "Lopez",
    email: "carlos@example.com",
    favoriteColor: "purple",
    birthday: "1990-11-17"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Contact.deleteMany(); // Limpia la colección
    await Contact.insertMany(contacts);
    console.log("✅ Contactos insertados correctamente");
    process.exit();
  } catch (err) {
    console.error("❌ Error en seed:", err.message);
    process.exit(1);
  }
};

seedDB();
