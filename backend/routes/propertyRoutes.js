const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes (anyone can view properties)
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);

// Protected route (only logged-in users can add properties)
router.post('/', authMiddleware, upload.single('image'), propertyController.createProperty);

module.exports = router;