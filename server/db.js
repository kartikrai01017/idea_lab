const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ✅ FIX: works on both local + Render
const dbPath = path.join(process.cwd(), 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');

    // =========================
    // USERS TABLE
    // =========================
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      strikes INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      last_active_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // =========================
    // COMPLETED TASKS TABLE
    // =========================
    db.run(`CREATE TABLE IF NOT EXISTS completed_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      task_id INTEGER DEFAULT 1,
      task_name TEXT,
      task_category TEXT,
      points_earned INTEGER NOT NULL,
      latitude REAL,
      longitude REAL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
  }
});

module.exports = db;