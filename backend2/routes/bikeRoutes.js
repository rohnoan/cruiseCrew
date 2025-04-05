const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');
const authenticate = require('../middleware/authMiddleware');

// Get all bikes (for customers)
router.get('/', async (req, res) => {
    const bikes = await Bike.find();
    res.json(bikes);
});

// Get seller's bikes (only their own bikes)
router.get('/seller', authenticate(['seller']), async (req, res) => {
    try {
        const bikes = await Bike.find({ seller: req.user.id });
        res.json(bikes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seller bikes' });
    }
});

// Search bikes
router.get('/search', async (req, res) => {
    const { q } = req.query;
    const bikes = await Bike.find({ name: { $regex: q, $options: 'i' } });
    res.json(bikes);
});

// Create bike (only seller)
router.post('/', authenticate(['seller']), async (req, res) => {
    try {
        const bike = new Bike({ ...req.body, seller: req.user.id });
        await bike.save();
        res.status(201).json(bike);
    } catch (error) {
        res.status(500).json({ message: 'Error creating bike' });
    }
});

// Update bike (only seller)
router.put('/:id', authenticate(['seller']), async (req, res) => {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bike);
});

// Delete bike (only seller & only their own bikes)
router.delete('/:id', authenticate(['seller']), async (req, res) => {
    try {
        const bike = await Bike.findOne({ _id: req.params.id, seller: req.user.id });
        if (!bike) {
            return res.status(404).json({ message: 'Bike not found or unauthorized' });
        }
        await bike.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bike' });
    }
});

module.exports = router;
