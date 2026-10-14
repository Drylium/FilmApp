import express from "express";
import { Comment } from "../models/Comment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { movieId } = req.query;
    const comments = await Comment.find({ movieId }).populate("userId", "username");
    res.json(comments);
  } catch {
    res.status(500).json({ error: "Kunde inte hämta kommentarer" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { movieId, text } = req.body;

    const comment = await Comment.create({
      movieId,
      text,
      userId: req.user.userId
    });

    res.json(comment);
  } catch {
    res.status(500).json({ error: "Kunde inte skapa kommentar" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const updated = await Comment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { text },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Kommentar hittades inte" });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Kunde inte uppdatera kommentar" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Comment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) return res.status(404).json({ error: "Kommentar hittades inte" });

    res.json({ message: "Kommentar borttagen" });
  } catch {
    res.status(500).json({ error: "Kunde inte ta bort kommentar" });
  }
});

export default router;