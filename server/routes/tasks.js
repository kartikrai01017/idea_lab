const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

// Tasks list
const TASKS = [
  { id: 1, icon: '🚶', title: 'Walk Instead of Drive', desc: 'Walk or cycle for short trips.', difficulty: 'easy', category: 'transport', pts: 50 },
  { id: 2, icon: '🌳', title: 'Plant 5 Trees', desc: 'Plant saplings in your area.', difficulty: 'hard', category: 'trees', pts: 200 },
  { id: 3, icon: '💧', title: 'Save Water', desc: 'Reduce water usage today.', difficulty: 'medium', category: 'water', pts: 80 },
  { id: 4, icon: '♻️', title: 'Recycle Waste', desc: 'Collect recyclables.', difficulty: 'medium', category: 'waste', pts: 100 }
];

// GET tasks
router.get('/', (req, res) => {
  res.json(TASKS);
});

// POST submit task
router.post('/submit', auth, async (req, res) => {
  try {
    const {
      taskType,
      passed,
      task_name,
      task_category,
      latitude,
      longitude
    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const pts =
      taskType === 'fitness' ? 100 :
      taskType === 'video' ? 80 :
      taskType === 'group' ? 120 : 90;

    // ❌ FRAUD CASE
    if (!passed) {
      const deduction =
        taskType === 'fitness' ? 150 :
        taskType === 'video' ? 120 : 100;

      db.run(
        `UPDATE users SET points = points - ?, strikes = strikes + 1 WHERE id = ?`,
        [deduction, userId],
        function (err) {
          if (err) {
            console.error("DB error (fraud update):", err);
            return res.status(500).json({ error: 'Database error' });
          }

          return res.json({
            success: false,
            message: 'Fraud detected',
            pointsDeducted: deduction
          });
        }
      );

      return;
    }

    // ✅ SUCCESS CASE → wrap everything safely
    db.get(
      `SELECT points, current_streak, last_active_date FROM users WHERE id = ?`,
      [userId],
      (err, user) => {
        if (err) {
          console.error("DB error (user fetch):", err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const todayStr = new Date().toISOString().split('T')[0];

        let newStreak = user.current_streak || 0;
        let lastDate = user.last_active_date;

        if (!lastDate) {
          newStreak = 1;
        } else {
          const diff =
            (new Date(todayStr) - new Date(lastDate)) /
            (1000 * 60 * 60 * 24);

          if (diff === 1) newStreak += 1;
          else if (diff > 1) newStreak = 1;
        }

        // Update user
        db.run(
          `UPDATE users 
           SET points = points + ?, current_streak = ?, last_active_date = ?
           WHERE id = ?`,
          [pts, newStreak, todayStr, userId],
          function (err) {
            if (err) {
              console.error("DB error (update user):", err);
              return res.status(500).json({ error: 'Database error' });
            }

            // Insert task record
            db.run(
              `INSERT INTO completed_tasks 
              (user_id, task_name, task_category, points_earned, latitude, longitude)
              VALUES (?, ?, ?, ?, ?, ?)`,
              [
                userId,
                task_name || 'Eco Task',
                task_category || 'general',
                pts,
                latitude || null,
                longitude || null
              ],
              (err2) => {
                if (err2) {
                  console.error("DB error (insert task):", err2);
                  return res.status(500).json({ error: 'Database error' });
                }

                return res.json({
                  success: true,
                  message: 'Proof verified',
                  pointsAdded: pts,
                  currentStreak: newStreak
                });
              }
            );
          }
        );
      }
    );

  } catch (err) {
    console.error("Unexpected server crash:", err);
    res.status(500).json({ error: 'Server crash' });
  }
});

module.exports = router;