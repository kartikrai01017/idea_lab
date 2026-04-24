const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'ecomira-ultra-secret-key';

// ─── Register ─────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  console.log('--- Registration Attempt ---');
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password.' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await db.execute({
      sql: `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
      args: [name, email, hash],
    });

    // Ensure ID is a primitive number for the JWT
    const newId = Number(result.lastInsertRowid);
    console.log(`✅ User registered with ID: ${newId}`);

    const token = jwt.sign(
      { id: newId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'User registered successfully', token });

  } catch (err) {
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      console.log('❌ Registration failed: Email exists');
      return res.status(400).json({ error: 'Email already exists.' });
    }
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  console.log('--- Login Attempt ---');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    const result = await db.execute({
      sql: `SELECT * FROM users WHERE email = ?`,
      args: [email],
    });

    const user = result.rows[0];
    if (!user) {
      console.log(`❌ Login failed: No user found with email ${email}`);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      console.log(`❌ Login failed: Incorrect password for ${email}`);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userId = Number(user.id);
    console.log(`✅ User ${userId} logged in successfully`);

    const token = jwt.sign(
      { id: userId, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Logged in successfully', token, name: user.name });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;
