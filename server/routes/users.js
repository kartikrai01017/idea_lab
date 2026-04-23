const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

// Get current user profile
router.get('/me', auth, (req, res) => {
  db.get(`SELECT id, email, name, points, strikes, current_streak FROM users WHERE id = ?`, [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

// Get top leaderboard (public, no auth required)
router.get('/leaderboard', (req, res) => {
  db.all(
    `SELECT id, name, points, current_streak,
       (SELECT COUNT(*) FROM completed_tasks ct WHERE ct.user_id = users.id AND ct.latitude IS NOT NULL) as task_count
     FROM users
     ORDER BY points DESC
     LIMIT 20`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(rows);
    }
  );
});

module.exports = router;
