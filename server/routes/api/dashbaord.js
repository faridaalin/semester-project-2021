const express = require('express');
const router = express.Router();

const dashboardController = require('../../controllers/dashboard_controller');

// /dashboard
router.get('/', dashboardController.dashboard);

module.exports = router;
