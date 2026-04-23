const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Users Table
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

    // safe alter table for updates
    db.run(`ALTER TABLE users ADD COLUMN current_streak INTEGER DEFAULT 0`, () => {});
    db.run(`ALTER TABLE users ADD COLUMN last_active_date DATE`, () => {});

    // Create Completed Tasks Table (with geolocation + task metadata for heatmap)
    db.run(`CREATE TABLE IF NOT EXISTS completed_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      task_id INTEGER NOT NULL,
      task_name TEXT,
      task_category TEXT,
      points_earned INTEGER NOT NULL,
      latitude REAL,
      longitude REAL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
    
    // Migrate existing table if columns are missing (safe no-op if already exists)
    db.run(`ALTER TABLE completed_tasks ADD COLUMN task_name TEXT`, () => {});
    db.run(`ALTER TABLE completed_tasks ADD COLUMN task_category TEXT`, () => {});
    db.run(`ALTER TABLE completed_tasks ADD COLUMN latitude REAL`, () => {});
    db.run(`ALTER TABLE completed_tasks ADD COLUMN longitude REAL`, () => {});
  }
});

module.exports = db;
