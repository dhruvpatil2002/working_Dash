const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.get('/users', authMiddleware, requireRole('admin'), userController.listUsers);
router.get('/users/:id', authMiddleware, requireRole('admin'), userController.getUserById);
router.put('/users/:id', authMiddleware, requireRole('admin'), userController.updateUser);
router.delete('/users/:id', authMiddleware, requireRole('admin'), userController.deleteUser);

module.exports = router;
