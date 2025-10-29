const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

//Routes
const dishRoutes = require('./routes/menuRoutes');
const chefRoutes = require('./routes/chefsRoutes');
const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');

connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use('/api/dishes', dishRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

//for cloudinary
const uploadRoute = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});