const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch smart meter data
router.get('/data', async (req, res) => {
  try {
    const { data } = await axios.get('SMART_METER_API_URL');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching smart meter data', error });
  }
});

module.exports = router;
