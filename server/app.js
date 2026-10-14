import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});