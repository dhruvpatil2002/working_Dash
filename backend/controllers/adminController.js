const Admin = require('../models/adminModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new admin (usually only by superadmin)
exports.register = async (req, res) => {
  const { email, password, role, name } = req.body;
  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Admin already exists' });
  const admin = new Admin({ email, password, role, name });
  await admin.save();
  res.status(201).json({ id: admin._id, email: admin.email, role: admin.role, name: admin.name });
};

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { adminId: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, role: admin.role, email: admin.email });
};

// Get all admins (superadmin only)
exports.list = async (req, res) => {
  const admins = await Admin.find({}, '-password');
  res.json(admins);
};

// Get a single admin by ID
exports.getById = async (req, res) => {
  const admin = await Admin.findById(req.params.id, '-password');
  if (!admin) return res.status(404).json({ message: 'Not found' });
  res.json(admin);
};

// Update an admin (superadmin only, or self)
exports.update = async (req, res) => {
  const update = { ...req.body };
  if (req.body.password) update.password = await bcrypt.hash(update.password, 10);
  const admin = await Admin.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true, select: '-password' });
  if (!admin) return res.status(404).json({ message: 'Not found' });
  res.json(admin);
};

// Delete an admin (superadmin only, prevent self-delete)
exports.delete = async (req, res) => {
  if (req.admin._id === req.params.id) {
    return res.status(400).json({ message: "Can't delete your own admin account" });
  }
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Admin deleted' });
};
