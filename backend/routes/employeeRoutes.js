const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { processExcelUpload } = require('../controller/employeeController');

// Route to handle master employee excel upload
router.post('/upload-master', upload.single('file'), processExcelUpload);

module.exports = router;
