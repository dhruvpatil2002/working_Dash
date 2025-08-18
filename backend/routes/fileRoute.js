const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const upload = require('../middleware/multer'); // The module above

// Upload file (ADMIN or authorized users—adjust as needed)
router.post(
  '/projects/:projectId/files',
  authMiddleware,
  upload.single('file'),        // This is where Multer is used!
  filesController.uploadFile
);

// Other file routes...
router.get('/projects/:projectId/files', authMiddleware, filesController.listFiles);
router.get('/projects/:projectId/files/:fileId', authMiddleware, filesController.downloadFile);
router.put('/projects/:projectId/files/:fileId', authMiddleware, requireRole('admin'), filesController.updateFile);
router.delete('/projects/:projectId/files/:fileId', authMiddleware, requireRole('admin'), filesController.deleteFile);

module.exports = router;
