import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRouter from './routers/User.router.js';
import chatRouter from './routers/Chat.router.js';
import morgan from 'morgan'


const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// morgan middleware
app.use(morgan("tiny"));
// cors middleware 
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Use the routers
app.use('/users', userRouter);
app.use('/chats', chatRouter);

