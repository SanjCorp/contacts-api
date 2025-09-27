const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *       example:
 *         firstName: Ricardo
 *         lastName: Sanjines
 *         email: ricardo@example.com
 *         favoriteColor: blue
 *         birthday: 1995-05-01
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Obtener todos los contactos
 *     responses:
 *       200:
 *         description: Lista de contactos
 */
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
 * /api/contacts/{id}:
 *   get:
 *     summary: Obtener un contacto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contacto no encontrado" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Crear un nuevo contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contacto creado
 */
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Actualizar un contacto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contacto actualizado
 */
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: "Contacto no encontrado" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Eliminar un contacto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contacto no encontrado" });
    res.json({ message: "Contacto eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
