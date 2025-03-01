const pool = require('../config/db');

const insertSmartMeterData = (meterId, consumption, timestamp) => {
  const query = 'INSERT INTO smart_meter_data(meterId, consumption, timestamp) VALUES($1, $2, $3)';
  const values = [meterId, consumption, timestamp];
  
  return pool.query(query, values);
};

module.exports = { insertSmartMeterData };
