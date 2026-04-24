const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS setuphttps://idea-b18pflyzp-kartikrai01017s-projects.vercel.app/ 
const corsOptions = {
  origin: ["https://idea-b18pflyzp-kartikrai01017s-projects.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

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