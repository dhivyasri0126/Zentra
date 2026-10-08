import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import zentraRouter from './routes/zentra.js';


export default function createApp() {
  const app = express();

  // Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Adjusted for local dev API decoupling if needed
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  );

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Global Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // 100 requests per 10 min window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
  });
  app.use('/api/', apiLimiter);

  // Zentra Routes
  app.use('/api/zentra', zentraRouter);

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'SceneTrace API',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });


  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Centralized Express 5 Error Handler
  app.use((err, req, res, _next) => {
    console.error('[API Error]', err);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
      error: status === 500 ? 'Internal Server Error' : err.message,
    });
  });

  return app;
}
