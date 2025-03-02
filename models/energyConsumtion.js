const mongoose = require('mongoose');

const EnergyConsumptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deviceId: { type: String, required: true },
    deviceName: { type: String, required: true },
    energyUsed: { type: Number, required: true }, // kWh
    timestamp: { type: Date, default: Date.now }
  },
  { timeseries: { timeField: 'timestamp', granularity: 'minutes' } }
);

module.exports = mongoose.model('EnergyConsumption', EnergyConsumptionSchema);
