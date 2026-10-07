const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { processExcelUpload, getDashboardStats } = require('../controller/employeeController');

// Route to handle master employee excel upload
router.post('/upload-master', upload.single('file'), processExcelUpload);

// Route to get dashboard stats
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;
