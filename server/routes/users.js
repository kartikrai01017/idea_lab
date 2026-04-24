const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

// GET /api/users/me  (requires auth)
router.get('/me', auth, async (req, res) => {
  try {
    const result = await db.execute({
      sql: `SELECT id, email, name, points, strikes, current_streak FROM users WHERE id = ?`,
      args: [req.user.id],
    });

    const row = result.rows[0];
    if (!row) return res.status(404).json({ error: 'User not found' });

    res.json(row);
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/leaderboard  (public)
router.get('/leaderboard', async (req, res) => {
  try {
    const result = await db.execute(`
      SELECT id, name, points, current_streak,
        (SELECT COUNT(*) FROM completed_tasks ct WHERE ct.user_id = users.id AND ct.latitude IS NOT NULL) as task_count
      FROM users
      ORDER BY points DESC
      LIMIT 20
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
