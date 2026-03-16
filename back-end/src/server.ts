import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ensureProjectSeedData } from './lib/project-seed.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import projectRoutes from './routes/project.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const defaultAllowedOrigins = [
  'https://virtualtech.site',
  'https://www.virtualtech.site',
  'https://vtc.up.railway.app',
  'http://localhost:5173',
  'http://localhost:5174',
];
const allowedOrigins = (
  process.env.CORS_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? defaultAllowedOrigins
);

const summarizeRequestBody = (body: Record<string, unknown> | undefined) => {
  if (!body) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => {
      if (key === 'thumbnailUrl' && typeof value === 'string') {
        return [key, value.startsWith('data:') ? '[inline-image-data]' : value];
      }

      if (typeof value === 'string' && value.length > 160) {
        return [key, `${value.slice(0, 160)}...`];
      }

      return [key, value];
    }),
  );
};

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow server-to-server requests and approved browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);

    if (req.method !== 'GET') {
      console.log('Body:', summarizeRequestBody(req.body));
    }

    next();
  });
}

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'VTC Backend is running' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    await ensureProjectSeedData();
  } catch (error) {
    console.error('Failed to initialize project seed data:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

void startServer();

export default app;
