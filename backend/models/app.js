// app.js

require('dotenv').config(
    {
        path:'./.env'
    }
);
const express = require('express');
const cors = require('cors');
const path = require('path');

// Custom modules
const connectDB = require('../config/db.js');

// Route imports
const authRoutes = require('../routes/authRoute.js');
const projectRoutes = require('../routes/projectsRoute.js');
const siteRoutes = require('../routes/siteRoute.js');
const cameraRoutes = require('../routes/cameraRoute.js');
const fileRoutes = require('../routes/fileRoute.js');
const userRoutes = require('../routes/usersRoute.js');
const adminRoutes = require('../routes/adminRoute.js');
const dashboardRoutes = require('../routes/dashboardRoute.js');

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static route for file download (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
// Site routes: handles /projects/:projectId/sites, /sites/:id, etc.
app.use(siteRoutes);
// Camera routes: handles /sites/:siteId/cameras, /cameras/:id, etc.
app.use(cameraRoutes);
app.use('/dashboard', dashboardRoutes);
app.use(fileRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('CMS Client Dashboard Backend is Running');
});

// Error handling (basic centralized)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
