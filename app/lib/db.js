// app/lib/db.js
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
})

// Opsional: hanya test saat di dev mode dan server-side
if (process.env.NODE_ENV !== 'production') {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Database connection test failed:', err.message)
      return
    }
    console.log('✅ Database connection test successful')
    release()
  })
}

export { pool }