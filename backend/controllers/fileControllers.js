const File = require('../models/filesModels.js');
const Project = require('../models/projectModel.js');
const fs = require('fs');
const path = require('path');

// Upload file to a specific project
exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const file = new File({
    projectRef: req.params.projectId,
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.user._id,
    description: req.body.description || ''
  });
  await file.save();
  res.status(201).json(file);
};

// List files of a project
exports.listFiles = async (req, res) => {
  const files = await File.find({ projectRef: req.params.projectId });
  res.json(files);
};

// Download a specific file
exports.downloadFile = async (req, res) => {
  const file = await File.findById(req.params.fileId);
  if (!file) return res.status(404).json({ message: 'File not found' });

  res.download(file.path, file.originalName);
};

// Update file metadata (not file data here, just metadata)
exports.updateFile = async (req, res) => {
  const update = {};
  if (req.body.description) update.description = req.body.description;
  if (req.body.filename) update.filename = req.body.filename;

  const file = await File.findByIdAndUpdate(req.params.fileId, update, { new: true });
  if (!file) return res.status(404).json({ message: 'File not found' });
  res.json(file);
};

// Delete a file (and remove from storage)
exports.deleteFile = async (req, res) => {
  const file = await File.findByIdAndDelete(req.params.fileId);
  if (!file) return res.status(404).json({ message: 'File not found' });

  // Delete from disk
  fs.unlink(file.path, err => {
    if (err) console.error('Could not delete file from disk:', err);
  });
  res.json({ message: 'File deleted successfully' });
};
