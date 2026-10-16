import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashed });
    res.json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: "Username already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "supersecret"
  );

  res.json({ token });
});

export default router;