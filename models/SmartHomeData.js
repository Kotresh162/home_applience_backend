const mongoose = require('mongoose');

const SmartHomeDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SmartHomeData', SmartHomeDataSchema);
