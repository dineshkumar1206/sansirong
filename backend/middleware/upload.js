const multer = require('multer');

// Memory storage for immediate processing
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;
