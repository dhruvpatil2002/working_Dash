const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel.js');

// Verifies JWT and attaches admin to req.admin
exports.adminAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });
  try {
    const payload = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.adminId);
    if (!admin) return res.status(401).json({ message: 'Admin not found' });
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Restrict endpoint to specific admin roles
exports.requireAdminRole = (role) => (req, res, next) => {
  if (req.admin.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};
