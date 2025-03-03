const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { logEnergyConsumption, getEnergyData, setEnergyBudget } = require('../controllers/energyController');

router.post('/log', protect, logEnergyConsumption);
router.get('/data', protect, getEnergyData);
router.post('/budget', protect, setEnergyBudget);

module.exports = router;
