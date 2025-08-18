const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  filename: String,
  originalName: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
});

module.exports = mongoose.model('File', FileSchema);
