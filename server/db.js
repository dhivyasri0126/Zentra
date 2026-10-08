import pg from 'pg';

const { Client, Pool } = pg;

let pool = null;

export async function initDB() {
  const host = process.env.PGHOST || 'localhost';
  const port = parseInt(process.env.PGPORT || '5432', 10);
  const user = process.env.PGUSER || 'postgres';
  const password = process.env.PGPASSWORD || 'Password';
  const database = process.env.PGDATABASE || 'zentra_db';

  // 1. Connect to default 'postgres' database to check/create the target database
  const adminClient = new Client({
    host,
    port,
    user,
    password,
    database: 'postgres',
  });

  try {
    await adminClient.connect();
    const checkDbRes = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [database]
    );

    if (checkDbRes.rowCount === 0) {
      console.log(`[DB] Database "${database}" does not exist. Creating...`);
      // Database names cannot be parameterized in CREATE DATABASE queries
      await adminClient.query(`CREATE DATABASE "${database.replace(/"/g, '""')}"`);
      console.log(`[DB] Database "${database}" created successfully.`);
    } else {
      console.log(`[DB] Database "${database}" already exists.`);
    }
  } catch (err) {
    console.error('[DB] Error verifying/creating database:', err.message);
    throw err;
  } finally {
    await adminClient.end().catch(() => {});
  }

  // 2. Instantiate global Pool targeting the target database
  pool = new Pool({
    host,
    port,
    user,
    password,
    database,
  });

  // 3. Run schema migrations/initialization
  try {
    // Enable pgcrypto for UUID generation support
    await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        prompt TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create session_images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_images (
        id SERIAL PRIMARY KEY,
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        mime_type VARCHAR(50) NOT NULL,
        image_data TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create session_history table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_history (
        id SERIAL PRIMARY KEY,
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        user_prompt TEXT,
        ai_response JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('[DB] Tables initialized successfully.');
  } catch (err) {
    console.error('[DB] Error initializing schema:', err.message);
    throw err;
  }

  return pool;
}

export { pool };
export default pool;
