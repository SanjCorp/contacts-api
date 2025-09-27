const express = require('express');
const router = express.Router();
const Contact = require('../db/contactModel');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Obtiene todos los contactos
 *     responses:
 *       200:
 *         description: Lista de contactos
 */
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
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

// POST create new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday)
    return res.status(400).json({ message: 'All fields are required' });

  const contact = new Contact({ firstName, lastName, email, favoriteColor, birthday });

  try {
    const newContact = await contact.save();
    res.status(201).json({ id: newContact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update contact
router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
