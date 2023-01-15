const express = require('express');
require('dotenv').config();

const dbsetup = require('./database/setup');
const bookRoutes = require('./routes/bookroutes');
const authRoutes = require('./routes/authRoutes');

// Connect to DB
dbsetup();

// Initialize Express 
const app = express();

// Initialize Express middleware
app.use(express.json());

// Seeders
const {seedAdmin} = require('./seeders/admin');
// console.log(seedAdmin());

// Create Express Route
app.use(bookRoutes)
app.use('/auth', authRoutes)

// Port
const port = process.env.PORT;

// Listen
app.listen(port, () => console.log(`app listening on port ${port}`));



