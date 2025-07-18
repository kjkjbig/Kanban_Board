import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log('MongoDB connected');
});

app.use('/', authRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
