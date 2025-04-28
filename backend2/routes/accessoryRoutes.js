const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');
const authenticate = require('../middleware/authMiddleware');

// Get all accessories (for customers)
router.get('/', async (req, res) => {
    try {
        const accessories = await Accessory.find();
        res.json(accessories || []); // Return empty array if no accessories
    } catch (error) {
        res.json([]); // Return empty array on error
    }
});

// Get renter's accessories (only their own accessories)
router.get('/seller', authenticate(['renter']), async (req, res) => {
    try {
        const accessories = await Accessory.find({ seller: req.user.id });
        res.json(accessories || []); // Return empty array if no accessories
    } catch (error) {
        res.json([]); // Return empty array instead of error
    }
});

// Search accessories
router.get('/search', async (req, res) => {
    const { q } = req.query;
    const accessories = await Accessory.find({ name: { $regex: q, $options: 'i' } });
    res.json(accessories);
});

// Create accessory (only renter)
router.post('/', authenticate(['renter']), async (req, res) => {
    try {
        const accessory = new Accessory({ ...req.body, seller: req.user.id });
        await accessory.save();
        res.status(201).json(accessory);
    } catch (error) {
        console.error('Error creating accessory:', error); // Add this for debugging
        res.status(500).json({ message: 'Error creating accessory' });
    }
});

// Update accessory (only renter)
router.put('/:id', authenticate(['renter']), async (req, res) => {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(accessory);
});

// Delete accessory (only renter & only their own accessories)
router.delete('/:id', authenticate(['renter']), async (req, res) => {
    try {
        const accessory = await Accessory.findOne({ _id: req.params.id, seller: req.user.id });
        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found or unauthorized' });
        }
        await accessory.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting accessory' });
    }
});

module.exports = router; 