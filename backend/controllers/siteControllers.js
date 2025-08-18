const Site = require('../models/siteModel.js');

// CREATE
exports.createSite = async (req, res) => {
  const site = new Site({ ...req.body, projectRef: req.params.projectId });
  await site.save();
  res.status(201).json(site);
};

// READ ALL FOR PROJECT
exports.getSitesByProject = async (req, res) => {
  const sites = await Site.find({ projectRef: req.params.projectId });
  res.json(sites);
};

// UPDATE
exports.updateSite = async (req, res) => {
  const site = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!site) return res.status(404).json({ message: 'Not found' });
  res.json(site);
};

// DELETE
exports.deleteSite = async (req, res) => {
  const site = await Site.findByIdAndDelete(req.params.id);
  if (!site) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Site deleted' });
};
