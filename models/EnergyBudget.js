const mongoose = require('mongoose');

const EnergyBudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  monthlyLimit: { type: Number, required: true }, // kWh
  currentUsage: { type: Number, default: 0 }
});

module.exports = mongoose.model('EnergyBudget', EnergyBudgetSchema);
