require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Report = require('./models/Report');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes

// POST /api/reports - save a new report
app.post('/api/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to save report' });
  }
});

// GET /api/reports - get all reports (optional, for testing)
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
