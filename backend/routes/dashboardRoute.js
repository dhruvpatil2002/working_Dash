const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Site = require('../models/Site');
const Camera = require('../models/Camera');
const dashboardController=require ('../controllers/dashboardController')
router.get('/stats', async (req, res) => {
  const [totalProjects, totalSites, activeCameras, activeProjects] = await Promise.all([
    Project.countDocuments(),
    Site.countDocuments(),
    Camera.countDocuments({ status: 'active' }),
    Project.countDocuments({ status: 'active' })
  ]);
  res.json({ totalProjects, totalSites, activeCameras, activeProjects });
});

module.exports = router;
