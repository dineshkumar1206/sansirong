require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import modular files
const { syncDB } = require('./models/MasterData');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Database Tables
syncDB();

// API Routes
app.use('/api', employeeRoutes);

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
