const { createClient } = require('@libsql/client');

// Uses Turso (hosted LibSQL) in production, or a local file in dev
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./database.sqlite',
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

// Initialize tables on startup
async function initDb() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        strikes INTEGER DEFAULT 0,
        current_streak INTEGER DEFAULT 0,
        last_active_date TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS completed_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        task_name TEXT,
        task_category TEXT,
        points_earned INTEGER NOT NULL,
        latitude REAL,
        longitude REAL,
        completed_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('✅ Database initialized (Turso/LibSQL)');
  } catch (err) {
    console.error('❌ DB init error:', err.message);
    process.exit(1);
  }
}

initDb();

module.exports = client;