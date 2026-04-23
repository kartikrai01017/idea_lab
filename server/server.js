const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "https://idea-lab-navy.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ VERY IMPORTANT: handle preflight requests
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/map', require('./routes/map'));

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});