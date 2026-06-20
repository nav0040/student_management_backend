import app from './app';
import dotenv from 'dotenv';
import { prisma } from './database/prisma';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log('📦 Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

bootstrap();
