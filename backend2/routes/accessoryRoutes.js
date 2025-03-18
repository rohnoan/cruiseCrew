const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');
const authenticate = require('../middleware/authMiddleware');

// Get all accessories (for customers)
router.get('/', async (req, res) => {
    const accessories = await Accessory.find();
    res.json(accessories);
});

// Search accessories
router.get('/search', async (req, res) => {
    const { q } = req.query;
    const accessories = await Accessory.find({ name: { $regex: q, $options: 'i' } });
    res.json(accessories);
});

// Create accessory (only seller)
router.post('/', authenticate(['seller']), async (req, res) => {
    const accessory = new Accessory({ ...req.body, seller: req.user.id });
    await accessory.save();
    res.status(201).json(accessory);
});

// Update accessory (only seller)
router.put('/:id', authenticate(['seller']), async (req, res) => {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(accessory);
});

// Delete accessory (only seller)
router.delete('/:id', authenticate(['seller']), async (req, res) => {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router; 