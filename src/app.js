import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
app.use(express.json());
app.use(cookieParser());

//FIXED CORS CONFIGURATION
app.use(cors({
  origin: 'https://chatty-six-theta.vercel.app',  // Allow your frontend URL
  credentials: true                  // Allow cookies, tokens, etc.
}));

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:` + PORT);
  connectDB();
});
