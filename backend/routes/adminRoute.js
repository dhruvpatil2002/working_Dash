const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth, requireAdminRole } = require('../middleware/adminAuth');

// Register new admin: only superadmin
router.post('/admins/register', adminAuth, requireAdminRole('superadmin'), adminController.register);

// Admin login: open
router.post('/admins/login', adminController.login);

// List all admins: superadmin only
router.get('/admins', adminAuth, requireAdminRole('superadmin'), adminController.list);

// Get one admin: superadmin only
router.get('/admins/:id', adminAuth, requireAdminRole('superadmin'), adminController.getById);

// Update admin: superadmin only (or self-update)
router.put('/admins/:id', adminAuth, requireAdminRole('superadmin'), adminController.update);

// Delete admin: superadmin only, not self
router.delete('/admins/:id', adminAuth, requireAdminRole('superadmin'), adminController.delete);

module.exports = router;
