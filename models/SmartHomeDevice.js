const mongoose = require('mongoose');

const SmartHomeDeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true, unique: true },
  deviceName: { type: String, required: true },
  deviceType: { type: String, required: true },
  location: { type: String },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SmartHomeDevice', SmartHomeDeviceSchema);
