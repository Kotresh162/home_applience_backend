const express = require('express');
const { getUserDevices, registerSmartDevice } = require('../controllers/SmartHomeDeviceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/devices/:userId', protect, getUserDevices);
router.post('/register', protect, registerSmartDevice);

module.exports = router;
