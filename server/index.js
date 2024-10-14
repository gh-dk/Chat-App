import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routers/User.router.js";
import chatRouter from "./routers/Chat.router.js";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "node:http";

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// morgan middleware
app.use(morgan("tiny"));
// cors middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Use the routers
app.use("/users", userRouter);
app.use("/chats", chatRouter);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "*", // Set CORS to allow all origins or specific ones
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log(`Message received: ${msg}`);
    io.emit("message", msg); // Broadcast message to all connected clients
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${reason}`);
  });
});