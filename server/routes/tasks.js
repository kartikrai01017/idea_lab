const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const db = require('../db');

// Ideally this comes from DB, but keeping it simple as a static array per the UI design
const TASKS = [
  {id:1,icon:'🚶',title:'Walk Instead of Drive',desc:'Walk or cycle for any commute up to 5km today. Skip the vehicle entirely for short trips.',difficulty:'easy',category:'transport',pts:50,creative:true},
  {id:2,icon:'🌳',title:'Plant 5 Trees',desc:'Plant 5 saplings in your area — courtyard, park, or roadside.',difficulty:'hard',category:'trees',pts:200,creative:false},
  {id:3,icon:'💧',title:'Save 20 Liters of Water',desc:'Shorter shower, turn off taps, reuse cooking water.',difficulty:'medium',category:'water',pts:80,creative:true},
  {id:4,icon:'♻️',title:'Collect 5kg Recyclables',desc:'Gather plastic bottles, cardboard, metal cans.',difficulty:'medium',category:'waste',pts:100,creative:false},
  // Add backend versions of the points matching the frontend UI submissions
];

// Get Tasks
router.get('/', (req, res) => {
  res.json(TASKS);
});

// Submit a Task Proof
router.post('/submit', auth, (req, res) => {
  const { taskType, passed, task_name, task_category, latitude, longitude } = req.body;
  const userId = req.user.id;

  const pts = taskType === 'fitness' ? 100 : taskType === 'video' ? 80 : taskType === 'group' ? 120 : 90;
  
  if (passed) {
    db.get(`SELECT points, current_streak, last_active_date FROM users WHERE id = ?`, [userId], (err, row) => {
      if (err) return res.status(500).json({ error: 'DB Error' });
      
      const todayStr = new Date().toISOString().split('T')[0];
      let newStreak = row.current_streak || 0;
      let newDate = row.last_active_date;
      
      if (!newDate) {
        newStreak = 1;
        newDate = todayStr;
      } else {
        const today = new Date(todayStr);
        const lastActive = new Date(newDate);
        const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
          newStreak += 1;
          newDate = todayStr;
        } else if (diffDays > 1) {
          newStreak = 1;
          newDate = todayStr;
        }
      }

      db.run(
        `UPDATE users SET points = points + ?, current_streak = ?, last_active_date = ? WHERE id = ?`, 
        [pts, newStreak, newDate, userId], 
        function(err) {
          if (err) return res.status(500).json({ error: 'DB Error' });
          
          // Store real geolocation + task metadata for the live heatmap
          db.run(
            `INSERT INTO completed_tasks (user_id, task_id, task_name, task_category, points_earned, latitude, longitude)
             VALUES (?, 1, ?, ?, ?, ?, ?)`,
            [userId, task_name || 'Eco Task', task_category || 'general', pts, latitude || null, longitude || null]
          );

          res.json({ success: true, message: 'Proof verified', pointsAdded: pts, currentStreak: newStreak });
      });
    });
  } else {
    const deduction = taskType === 'fitness' ? 150 : taskType === 'video' ? 120 : 100;
    db.run(`UPDATE users SET points = points - ?, strikes = strikes + 1 WHERE id = ?`, [deduction, userId], function(err) {
      if (err) return res.status(500).json({ error: 'DB Error' });
      res.json({ success: false, message: 'Fraud detected', pointsDeducted: deduction });
    });
  }
});

module.exports = router;
