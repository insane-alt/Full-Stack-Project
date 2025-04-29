const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const promBundle = require('express-prom-bundle');
const client = require('prom-client');
const sequelize = require('./config/db');
const authRouter = require('./routes/auth').router;
const studentRouter = require('./routes/studentRoutes');
const mentorRouter = require('./routes/mentorRoutes');
const { authenticateUser, requireRole, checkAdminPermission } = require('./middlewares/auth');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const METRICS_PORT = process.env.METRICS_PORT || 9090;

// Prometheus configuration
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'tisd-backend' },
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000,
      labels: { app: 'tisd-backend' }
    }
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Change this if needed
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Prometheus middleware
app.use(metricsMiddleware);

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/students', studentRouter);
app.use('/api/mentors', mentorRouter);

// Add metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Protected route examples (unchanged)
app.get('/api/admin/dashboard',
  authenticateUser,
  requireRole('admin'),
  checkAdminPermission('canManageUsers'),
  (req, res) => {
    res.json({ message: 'Admin dashboard access granted' });
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
async function startServer() {
  try {
    // Establish database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ force: false });
    console.log('Database models synchronized');

    // Start the app server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Metrics available on http://localhost:${PORT}/metrics`);
    });

    // Remove the duplicate server start
    // We don't need a separate metrics server since metrics are already
    // available on the main server at /metrics endpoint

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
