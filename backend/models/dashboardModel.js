// models/Dashboard.js

const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g., "Admin Overview", "Custom Panel"
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Which user owns this config
  layout: { type: Object },                         // For storing widget layout/preferences
  snapshot: {                                       // For storing computed KPI snapshot at a point in time
    totalProjects: Number,
    totalSites: Number,
    activeCameras: Number,
    activeProjects: Number,
    takenAt: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
