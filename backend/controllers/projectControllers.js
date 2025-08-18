const Project = require('../models/projectModel.js');

// CREATE
exports.createProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// READ ALL (with optional status filter)
exports.getAllProjects = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const projects = await Project.find(filter);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// READ ONE (with sites/camera count)
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('sites');
    if (!project) return res.status(404).json({ message: 'Not found' });
    // Optionally, calculate sitesCount/camerasCount here
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};