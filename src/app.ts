import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api/v1/students', studentRoutes);

app.use(errorHandler);

export default app;
