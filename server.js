
const express = require('express'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 
const smartHomeRoutes = require('./routes/smartHomeRoutes'); 
const energyRoutes = require('./routes/energyRoutes'); 
const cors = require('cors'); // Added CORS support


dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/smart-home', smartHomeRoutes);
app.use('/api/energy', energyRoutes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
