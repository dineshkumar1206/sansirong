require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import modular files
const { syncDB } = require('./models/MasterData');
const { InterviewList } = require('./models/InterviewList'); // Ensure this model is loaded
const { ExitEmployee } = require('./models/ExitEmployee'); // Ensure this model is loaded
const { syncAdmin } = require('./models/Admin');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authMiddleware');
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Database Tables
syncDB();
syncAdmin();

// API Routes
app.use('/api/auth', authRoutes); // Auth routes should not be protected
app.use('/api', authenticateToken, employeeRoutes); // Protected routes

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
