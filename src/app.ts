import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';

const app: Application = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Apply rate limiting to all api routes
app.use('/api', apiLimiter);

app.use('/api/v1/students', studentRoutes);

app.use(errorHandler);

export default app;
