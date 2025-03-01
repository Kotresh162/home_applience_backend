const pool = require('../config/db');

const insertSAPData = (enterpriseId, processStatus, timestamp) => {
  const query = 'INSERT INTO sap_data(enterpriseId, processStatus, timestamp) VALUES($1, $2, $3)';
  const values = [enterpriseId, processStatus, timestamp];
  
  return pool.query(query, values);
};

module.exports = { insertSAPData };
