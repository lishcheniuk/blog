const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const Comment = require("../models/comments.model");

const router = Router();

router.get("/comments/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId })
    .populate("userId", "name")
    .sort({
      date: -1,
    });

  res.json(comments);
});

router.post("/comment", userMiddleware, async (req, res) => {
  const comment = new Comment({
    text: req.body.value,
    userId: req.user.userId,
    postId: req.body.postId,
  });

  await comment.save();

  const populate = await Comment.findById(comment._id).populate(
    "userId",
    "name"
  );

  res.json({
    message: "Комментарий сохранен",
    comment: populate,
  });
});

module.exports = router;
