const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.json(contact);
});

// POST new contact
router.post('/', async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.status(201).json({ id: newContact._id });
});

// PUT update contact
router.put('/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Contact not found" });
  res.sendStatus(200);
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Contact not found" });
  res.sendStatus(200);
});

module.exports = router;