import express from "express";
import { Comment } from "../models/Comment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// GET comments for a movie
router.get("/:movieId", async (req, res) => {
  const comments = await Comment.findAll({
    where: { movieId: req.params.movieId }
  });

  res.json(comments);
});

// CREATE comment
router.post("/", auth, async (req, res) => {
  const { text, movieId } = req.body;

  const comment = await Comment.create({
    text,
    movieId,
    userId: req.user.id
  });

  res.json(comment);
});

// UPDATE comment
router.patch("/:id", auth, async (req, res) => {
  const { text } = req.body;

  await Comment.update(
    { text },
    { where: { id: req.params.id, userId: req.user.id } }
  );

  res.json({ message: "Comment updated" });
});

// DELETE comment
router.delete("/:id", auth, async (req, res) => {
  await Comment.destroy({
    where: { id: req.params.id, userId: req.user.id }
  });

  res.json({ message: "Comment deleted" });
});

export default router;