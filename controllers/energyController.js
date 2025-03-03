const EnergyConsumption = require('../models/energyConsumtion');
const EnergyBudget = require('../models/EnergyBudget');


const logEnergyConsumption = async (req, res) => {
  try {
    const { userId, deviceId, deviceName, energyUsed, timestamp } = req.body;

    // Validate required fields
    if (!userId || !deviceId || !deviceName || !energyUsed) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new energy consumption log
    const newLog = new EnergyConsumption({
      userId,
      deviceId,
      deviceName,
      energyUsed,
      timestamp: timestamp || new Date() // Default to current time if not provided
    });

    // Save to MongoDB
    await newLog.save();

    res.status(201).json({ message: 'Energy consumption recorded successfully', data: newLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEnergyData = async (req, res) => {
  try {
    const { userId, deviceId, deviceName, energyUsed, timestamp } = req.body;

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
    const { userId, deviceId, deviceName, energyUsed, timestamp } = req.body;
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
