// 1. Require path and configure dotenv at the very top
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// 2. Require other dependencies (Notice we removed the duplicate 'path' here)
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

// 3. Initialize app and database
const app = express();
connectDB();

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// 6. Serve Static Frontend
// This points to your frontend folder where your HTML/CSS/JS lives
app.use(express.static(path.join(__dirname, '../frontend')));

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));