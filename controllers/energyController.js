const EnergyConsumption = require('../models/energyConsumtion');
const EnergyBudget = require('../models/EnergyBudget');

// Store energy consumption data
const logEnergyConsumption = async (req, res) => {
  try {
    const { deviceId, deviceName, energyUsed } = req.body;
    const userId = req.user._id; // Get userId from the authenticated user

    if (!deviceId || !energyUsed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const energyRecord = new EnergyConsumption({ userId, deviceId, deviceName, energyUsed });
    
    try {
        await energyRecord.save();
        res.status(201).json({ message: 'Energy data logged successfully', energyRecord });
    } catch (error) {
        console.error('🔥 Error saving energy record:', error.message);
        return res.status(500).json({ message: 'Error saving energy record', error });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getEnergyData = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authenticated user

    const energyData = await EnergyConsumption.find({ userId }).sort({ timestamp: -1 });

    if (!energyData.length) {
      return res.status(404).json({ message: 'No energy data found' });
    }

    res.status(200).json({ energyData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Set energy usage budget
const setEnergyBudget = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authenticated user
    const { monthlyLimit } = req.body;

    if (!monthlyLimit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let budget = await EnergyBudget.findOne({ userId });

    if (budget) {
      budget.monthlyLimit = monthlyLimit;
    } else {
      budget = new EnergyBudget({ userId, monthlyLimit });
    }

    await budget.save();
    res.status(200).json({ message: 'Budget updated', budget });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { logEnergyConsumption, getEnergyData, setEnergyBudget };
