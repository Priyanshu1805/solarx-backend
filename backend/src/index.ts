import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import formRoutes from './routes/formRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/form', formRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});