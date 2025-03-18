require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS with all origins and common methods
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const accessoryRoutes = require('./routes/accessoryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/accessories', accessoryRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on ${PORT}`));
    })
    .catch(err => console.error(err));
