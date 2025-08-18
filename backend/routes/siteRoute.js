// routes/siteRoute.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Get all sites for a specific project
router.get('/projects/:projectId/sites', authMiddleware, siteController.getSitesByProject);

// Create a site under a project (admin only)
router.post('/projects/:projectId/sites', authMiddleware, requireRole('admin'), siteController.createSite);

// Update a site by ID (admin only)
router.put('/sites/:id', authMiddleware, requireRole('admin'), siteController.updateSite);

// Delete a site by ID (admin only)
router.delete('/sites/:id', authMiddleware, requireRole('admin'), siteController.deleteSite);

module.exports = router;
