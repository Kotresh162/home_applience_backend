const EnergyConsumption = require('../models/energyConsumtion');
const EnergyBudget = require('../models/EnergyBudget');

// Store energy consumption data
const logEnergyConsumption = async (req, res) => {
  try {
    const { userId, deviceId, deviceName, energyUsed } = req.body;

    if (!userId || !deviceId || !energyUsed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const energyRecord = new EnergyConsumption({ userId, deviceId, deviceName, energyUsed });
    await energyRecord.save();

    res.status(201).json({ message: 'Energy data logged', energyRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch energy consumption data for a user
const getEnergyData = async (req, res) => {
    try {
      const { userId } = req.params;
  
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
      const { userId, monthlyLimit } = req.body;
  
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
  
  // Check energy usage against budget
  const checkEnergyUsage = async (userId) => {
    const budget = await EnergyBudget.findOne({ userId });
    if (!budget) return;
  
    const currentMonthUsage = await EnergyConsumption.aggregate([
      { $match: { userId, timestamp: { $gte: new Date(new Date().setDate(1)) } } },
      { $group: { _id: null, totalUsage: { $sum: "$energyUsed" } } }
    ]);
  
    const usage = currentMonthUsage.length ? currentMonthUsage[0].totalUsage : 0;
    budget.currentUsage = usage;
  
    await budget.save();
  
    if (usage > budget.monthlyLimit) {
      console.log(`⚠️ Alert: User ${userId} exceeded their energy budget!`);
    }
  };
  
  module.exports = { logEnergyConsumption, getEnergyData, setEnergyBudget };
  
  