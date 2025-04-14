//MoralMentor\server\routes\dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, dashboardController.getDashboardData);

module.exports = router;