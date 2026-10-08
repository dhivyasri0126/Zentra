import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createApp from './src/app.js';
import { initDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file using Node native capability or dotenv
const serverEnvPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(serverEnvPath)) {
  process.loadEnvFile(serverEnvPath);
} else if (fs.existsSync(rootEnvPath)) {
  process.loadEnvFile(rootEnvPath);
}

const PORT = process.env.PORT || 5001;
const app = createApp();

try {
  await initDB();
  console.log('[SceneTrace Server] Database initialized successfully.');
} catch (err) {
  console.warn('[SceneTrace Server] Database initialization warning (server will still listen):', err.message);
}

const server = app.listen(PORT, () => {
  console.log(`[SceneTrace Server] Express 5 listening on port ${PORT}`);
});


process.on('SIGTERM', () => {
  console.log('[SceneTrace Server] Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});
