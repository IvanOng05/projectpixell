// app/lib/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
  max: 10,
  idleTimeoutMillis: 30000,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection test failed:', err.message);
    return;
  }
  console.log('Database connection test successful');
  release();
});

export { pool };