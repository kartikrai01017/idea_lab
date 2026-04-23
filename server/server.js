const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/map', require('./routes/map'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`EcoMira Backend is running on http://localhost:${PORT}`);
});
