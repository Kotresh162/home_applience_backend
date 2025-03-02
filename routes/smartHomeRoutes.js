const express = require('express');
const { getUserDevices, registerSmartDevice, updateDeviceTelemetry } = require('../controllers/SmartHomeDeviceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId/devices', getUserDevices);
router.post('/register', registerSmartDevice);
router.post('/telemetry', updateDeviceTelemetry); // New endpoint for telemetry updates

module.exports = router;
