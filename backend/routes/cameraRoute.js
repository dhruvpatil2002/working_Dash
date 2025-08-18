// routes/cameras.js

const express = require('express');
const router = express.Router();
const cameraController = require('../controllers/cameraController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Get all cameras for a site
router.get('/sites/:siteId/cameras', authMiddleware, cameraController.getCamerasBySite);

// Create a camera under a site (admin only)
router.post('/sites/:siteId/cameras', authMiddleware, requireRole('admin'), cameraController.createCamera);

// Update a camera by ID (admin only)
router.put('/cameras/:id', authMiddleware, requireRole('admin'), cameraController.updateCamera);

// Delete a camera by ID (admin only)
router.delete('/cameras/:id', authMiddleware, requireRole('admin'), cameraController.deleteCamera);

module.exports = router;
