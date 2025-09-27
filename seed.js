require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./db/contactModel');

mongoose.connect(process.env.MONGODB_URI);

const contacts = [
  { firstName: "Juan", lastName: "Perez", email: "juan@mail.com", favoriteColor: "blue", birthday: "1990-01-01" },
  { firstName: "Maria", lastName: "Lopez", email: "maria@mail.com", favoriteColor: "red", birthday: "1992-02-02" },
  { firstName: "Carlos", lastName: "Gomez", email: "carlos@mail.com", favoriteColor: "green", birthday: "1985-03-03" },
  { firstName: "Ana", lastName: "Torres", email: "ana@mail.com", favoriteColor: "yellow", birthday: "1995-04-04" },
  { firstName: "Luis", lastName: "Diaz", email: "luis@mail.com", favoriteColor: "purple", birthday: "1988-05-05" }
];

Contact.insertMany(contacts)
  .then(() => { 
    console.log("✅ 5 contacts inserted"); 
    mongoose.connection.close(); 
  })
  .catch(err => console.log(err));
