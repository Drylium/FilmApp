import express from "express";
import cors from "cors";

import { connectDB, sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Sync tables
sequelize.sync();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));