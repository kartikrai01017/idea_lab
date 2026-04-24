const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

const TASKS = [
  { id: 1, icon: '🚶', title: 'Walk Instead of Drive', desc: 'Walk or cycle for any commute up to 5km today.', difficulty: 'easy', category: 'transport', pts: 50, creative: true },
  { id: 2, icon: '🌳', title: 'Plant 5 Trees', desc: 'Plant 5 saplings in your area — courtyard, park, or roadside.', difficulty: 'hard', category: 'trees', pts: 200, creative: false },
  { id: 3, icon: '💧', title: 'Save 20 Liters of Water', desc: 'Shorter shower, turn off taps, reuse cooking water.', difficulty: 'medium', category: 'water', pts: 80, creative: true },
  { id: 4, icon: '♻️', title: 'Collect 5kg Recyclables', desc: 'Gather plastic bottles, cardboard, metal cans.', difficulty: 'medium', category: 'waste', pts: 100, creative: false },
];

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(TASKS);
});

// POST /api/tasks/submit
router.post('/submit', auth, async (req, res) => {
  console.log('--- Task Submission Received ---');
  try {
    const { taskType, passed, task_name, task_category, latitude, longitude } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      console.log('❌ Submission failed: No userId in token');
      return res.status(401).json({ error: 'Unauthorized: No user ID' });
    }

    console.log(`User ${userId} submitting ${taskType}. Passed: ${passed}`);

    const pts =
      taskType === 'fitness' ? 100 :
      taskType === 'video'   ? 80  :
      taskType === 'group'   ? 120 : 90;

    // ── FRAUD PATH ──────────────────────────────────────────────
    if (!passed) {
      const deduction = taskType === 'fitness' ? 150 : taskType === 'video' ? 120 : 100;
      console.log(`⚠️ Fraud detected. Deducting ${deduction} points from user ${userId}`);

      await db.execute({
        sql: `UPDATE users SET points = points - ?, strikes = strikes + 1 WHERE id = ?`,
        args: [deduction, userId],
      });

      return res.json({ success: false, message: 'Fraud detected', pointsDeducted: deduction });
    }

    // ── SUCCESS PATH ─────────────────────────────────────────────
    console.log('✅ Proof verified. Updating database...');
    
    const userResult = await db.execute({
      sql: `SELECT points, current_streak, last_active_date FROM users WHERE id = ?`,
      args: [userId],
    });

    const user = userResult.rows[0];
    if (!user) {
      console.log(`❌ User ${userId} not found in database`);
      return res.status(404).json({ error: 'User not found' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = user.current_streak || 0;
    const lastDate = user.last_active_date;

    if (!lastDate) {
      newStreak = 1;
    } else {
      const diff = Math.floor((new Date(todayStr) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        newStreak += 1;
      } else if (diff > 1) {
        newStreak = 1;
      }
    }

    // Wrap in a transaction or sequential executes
    await db.execute({
      sql: `UPDATE users SET points = points + ?, current_streak = ?, last_active_date = ? WHERE id = ?`,
      args: [pts, newStreak, todayStr, userId],
    });

    await db.execute({
      sql: `INSERT INTO completed_tasks (user_id, task_name, task_category, points_earned, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        userId, 
        task_name || 'Eco Task', 
        task_category || 'general', 
        pts, 
        latitude !== undefined ? latitude : null, 
        longitude !== undefined ? longitude : null
      ],
    });

    console.log(`🎉 Success! Added ${pts} points to user ${userId}. New streak: ${newStreak}`);
    return res.json({ success: true, message: 'Proof verified', pointsAdded: pts, currentStreak: newStreak });

  } catch (err) {
    console.error('❌ CRITICAL ERROR in /api/tasks/submit:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;