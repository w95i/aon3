const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getPostById } = require("../controllers/post.controller");
const { getCommentByPost } = require("../controllers/comments.controller");

router.get("/:id", authMiddleware, (req, res) => {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.id);
  const comment = getCommentByPost(postId);

  const post = getPostById(postId);

  if (userId !== post.userId) {
    return res.status(401).json({ message: "لاتصير لوتي!...." });
  }

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

module.exports = router;
