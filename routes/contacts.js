const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const result = await getDb().collection('contacts').find().toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await getDb().collection('contacts').findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
