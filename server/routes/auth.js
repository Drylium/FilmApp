import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "supersecret";

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Användarnamnet är upptaget" });

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash });

    res.json({ message: "Konto skapat" });
  } catch (error) {
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Fel användarnamn eller lösenord" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: "Fel användarnamn eller lösenord" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Serverfel vid login" });
  }
});

export default router;