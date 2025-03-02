const SmartHomeDevice = require('../models/SmartHomeDevice');

// Get all devices registered by a user
const getUserDevices = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all devices for the user
    const devices = await SmartHomeDevice.find({ userId });

    if (!devices.length) {
      return res.status(404).json({ message: 'No devices found for this user' });
    }

    res.status(200).json({ devices });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Register a new smart home device under a user
const registerSmartDevice = async (req, res) => {
  try {
    const { userId, deviceId, deviceName, deviceType, location } = req.body;

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
};

module.exports = { getUserDevices, registerSmartDevice };
