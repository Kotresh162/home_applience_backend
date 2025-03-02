const express = require('express');
const { logEnergyConsumption } = require('../controllers/energyController');
const authenticate = require('../middleware/authMiddleware'); // JWT authentication middleware

const router = express.Router();

router.post('/log', authenticate, logEnergyConsumption); // Log energy data
router.get('/:userId', authenticate, getEnergyData); // Fetch energy usage data
router.post('/budget', authenticate, setEnergyBudget); // Set energy budget

module.exports = router;
