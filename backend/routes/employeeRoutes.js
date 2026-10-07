const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { processExcelUpload, getDashboardStats, getEmployees } = require('../controller/employeeController');

// Route to handle master employee excel upload
router.post('/upload-master', upload.single('file'), processExcelUpload);

// Route to get dashboard stats
router.get('/dashboard-stats', getDashboardStats);

// Route to get all employees
router.get('/employees', getEmployees);

module.exports = router;
