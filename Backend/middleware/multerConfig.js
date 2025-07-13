const multer = require('multer');
const path = require('path');

// Define allowed file types
const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

// Configure storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storage'); // Specify the upload directory
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed.'), false);
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = upload; // Export the configured multer instance