const express = require('express');
const SmartHomeDevice = require('../models/SmartHomeDevice');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new smart home device under a user
router.post('/register', protect, async (req, res) => {
  try {
    const { userId, deviceId, deviceName, deviceType, location } = req.body;

    // Check if the user is authenticated
    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    // Check if device already exists
    const existingDevice = await SmartHomeDevice.findOne({ deviceId });
    if (existingDevice) return res.status(400).json({ message: 'Device already registered' });

    const device = new SmartHomeDevice({ userId, deviceId, deviceName, deviceType, location });
    await device.save();

    res.status(201).json({ message: 'Device registered successfully', device });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
