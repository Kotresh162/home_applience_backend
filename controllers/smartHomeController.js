const SmartHomeData = require('../models/SmartHomeData');
const { insertSmartMeterData } = require('../models/SmartMeterData');
const { insertSAPData } = require('../models/SAPData');

exports.ingestSmartHomeData = async (req, res) => {
  const { deviceId, status, timestamp } = req.body;
  
  const newSmartHomeData = new SmartHomeData({ deviceId, status, timestamp });
  
  try {
    await newSmartHomeData.save();
    res.status(201).send('Smart Home Data Ingested');
  } catch (error) {
    res.status(500).send('Error saving smart home data');
  }
};

exports.ingestSmartMeterData = async (req, res) => {
  const { meterId, consumption, timestamp } = req.body;
  
  try {
    await insertSmartMeterData(meterId, consumption, timestamp);
    res.status(201).send('Smart Meter Data Ingested');
  } catch (error) {
    res.status(500).send('Error saving smart meter data');
  }
};

exports.ingestSAPData = async (req, res) => {
  const { enterpriseId, processStatus, timestamp } = req.body;
  
  try {
    await insertSAPData(enterpriseId, processStatus, timestamp);
    res.status(201).send('SAP Data Ingested');
  } catch (error) {
    res.status(500).send('Error saving SAP data');
  }
};
