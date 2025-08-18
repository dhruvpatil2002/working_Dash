const Camera = require('../models/Camera.js');

// CREATE
exports.createCamera = async (req, res) => {
  const camera = new Camera({ ...req.body, siteRef: req.params.siteId });
  await camera.save();
  res.status(201).json(camera);
};

// READ ALL FOR SITE
exports.getCamerasBySite = async (req, res) => {
  const cameras = await Camera.find({ siteRef: req.params.siteId });
  res.json(cameras);
};

// UPDATE
exports.updateCamera = async (req, res) => {
  const camera = await Camera.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!camera) return res.status(404).json({ message: 'Not found' });
  res.json(camera);
};

// DELETE
exports.deleteCamera = async (req, res) => {
  const camera = await Camera.findByIdAndDelete(req.params.id);
  if (!camera) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Camera deleted' });
};
