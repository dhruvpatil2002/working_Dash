const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Project routes
router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Site routes (under project)
router.get('/projects/:projectId/sites', siteController.getSitesByProject);
router.post('/projects/:projectId/sites', siteController.createSite);
router.put('/sites/:id', siteController.updateSite);
router.delete('/sites/:id', siteController.deleteSite);

// Camera routes (under site)
router.get('/sites/:siteId/cameras', cameraController.getCamerasBySite);
router.post('/sites/:siteId/cameras', cameraController.createCamera);
router.put('/cameras/:id', cameraController.updateCamera);
router.delete('/cameras/:id', cameraController.deleteCamera);
