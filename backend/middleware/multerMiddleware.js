// middleware/multer.js

const multer = require('multer');
const path = require('path');

// Basic disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    // Use original name or customize as needed
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter (optional: restrict mime types)
function fileFilter(req, file, cb) {
  // Accept/screen file types, e.g., images or PDFs:
  // if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') cb(null, true);
  // else cb(new Error('Unsupported file type'), false);
  cb(null, true); // Allow all
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
