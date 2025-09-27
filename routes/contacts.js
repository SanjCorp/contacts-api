// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Modelo de MongoDB

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const contact = new Contact({
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json({ id: newContact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
