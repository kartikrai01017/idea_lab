const express = require('express');
const router = express.Router();
const db = require('../db');

// Get recent map activity pins (last 50 with coordinates) — public
router.get('/', (req, res) => {
  db.all(
    `SELECT ct.id, ct.task_name, ct.task_category, ct.points_earned,
            ct.latitude, ct.longitude, ct.completed_at,
            u.name as user_name
     FROM completed_tasks ct
     JOIN users u ON ct.user_id = u.id
     WHERE ct.latitude IS NOT NULL AND ct.longitude IS NOT NULL
     ORDER BY ct.completed_at DESC
     LIMIT 50`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(rows);
    }
  );
});

module.exports = router;
