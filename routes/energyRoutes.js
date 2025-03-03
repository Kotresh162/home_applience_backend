const express = require('express');
const router = express.Router();
const { logEnergyConsumption, getEnergyData, setEnergyBudget } = require('../controllers/energyController');

router.post('/log', logEnergyConsumption); // Removed 'protect'
router.get('/data', getEnergyData);
router.post('/budget', setEnergyBudget);

module.exports = router;
