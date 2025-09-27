require('dotenv').config();
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado para seeding'))
.catch(err => console.error('❌ Error de conexión:', err));

// Definir esquema y modelo
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Datos a insertar
const contacts = [
  {
    _id: "64f000000000000000000001",
    firstName: "Juan",
    lastName: "Perez",
    email: "juan.perez@email.com",
    favoriteColor: "Azul",
    birthday: "1990-05-12"
  },
  {
    _id: "64f000000000000000000002",
    firstName: "Maria",
    lastName: "Lopez",
    email: "maria.lopez@email.com",
    favoriteColor: "Rojo",
    birthday: "1988-11-20"
  },
  {
    _id: "64f000000000000000000003",
    firstName: "Carlos",
    lastName: "Gomez",
    email: "carlos.gomez@email.com",
    favoriteColor: "Verde",
    birthday: "1995-02-03"
  }
];

// Insertar los contactos
async function seedDB() {
  try {
    await Contact.deleteMany(); // Borra todos los contactos existentes
    const inserted = await Contact.insertMany(contacts);
    console.log('✅ Contactos insertados:', inserted);
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error al insertar:', err);
  }
}

seedDB();
