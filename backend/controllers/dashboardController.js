const  dashboard=require("../models/dashboardModel.js")
router.get('/dashboard/stats', async (req, res) => {
  const [totalProjects, totalSites, activeCameras, activeProjects] = await Promise.all([
    Project.countDocuments(),
    Site.countDocuments(),
    Camera.countDocuments({ status: 'active' }),
    Project.countDocuments({ status: 'active' })
  ]);
  res.json({ totalProjects, totalSites, activeCameras, activeProjects });
});
