const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ Update CORS to allow Netlify frontend
const allowedOrigins = [
  'http://famous-creponne-68f707.netlify.app/', // ✅ Replace with your actual Netlify URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Load Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
