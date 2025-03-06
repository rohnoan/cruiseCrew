const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');
const authenticate = require('../middleware/authMiddleware');

// Get all bikes (for customers)
router.get('/', async (req, res) => {
    const bikes = await Bike.find();
    res.json(bikes);
});

// Search bikes
router.get('/search', async (req, res) => {
    const { q } = req.query;
    const bikes = await Bike.find({ name: { $regex: q, $options: 'i' } });
    res.json(bikes);
});

// Create bike (only seller)
router.post('/', authenticate(['seller']), async (req, res) => {
    const bike = new Bike({ ...req.body, seller: req.user.id });
    await bike.save();
    res.status(201).json(bike);
});

// Update bike (only seller)
router.put('/:id', authenticate(['seller']), async (req, res) => {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bike);
});

// Delete bike (only seller)
router.delete('/:id', authenticate(['seller']), async (req, res) => {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;
