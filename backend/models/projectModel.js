const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  clientName: String,
  status: { type: String, enum: ['active', 'maintenance'], default: 'active' },
  lastUpdated: Date,
  summary: String,
  scope: String,
  sitesCount: Number,
  camerasCount: Number,
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }]
});
module.exports = mongoose.model('Project', ProjectSchema);