const mongoose = require('mongoose');

const SmartHomeDeviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true, unique: true },
  deviceName: { type: String, required: true },
  deviceType: { type: String, required: true },
  location: { type: String },
  registeredAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: null },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  telemetry: { type: mongoose.Schema.Types.Mixed } // Flexible for any telemetry data
});

module.exports = mongoose.model('SmartHomeDevice', SmartHomeDeviceSchema);
