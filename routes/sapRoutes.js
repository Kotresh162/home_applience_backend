const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/sap-data', async (req, res) => {
  try {
    const { data } = await axios.post(process.env.SAP_API_URL, req.body, {
      headers: { Authorization: `Bearer YOUR_OAUTH_ACCESS_TOKEN` },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'SAP API Error', error });
  }
});

module.exports = router;
