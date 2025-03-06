require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
    })
    .catch(err => console.error(err));
