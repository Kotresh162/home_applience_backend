const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const smartHomeRoutes = require('./routes/smartHomeRoutes');
const smartMeterRoutes = require('./routes/smartMeterRoutes');
const sapRoutes = require('./routes/sapRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/smart-home', smartHomeRoutes);
app.use('/api/smart-meter', smartMeterRoutes);
app.use('/api/sap', sapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
