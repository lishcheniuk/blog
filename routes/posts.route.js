const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const Post = require("../models/posts.model");
const User = require("../models/auth.model");
const upload = require("../middleware/upload");
const userMiddleware = require("../middleware/user");

const router = Router();

router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

router.post(
  "/posts/create",
  userMiddleware,
  upload.array("image"),
  async (req, res) => {
    try {
      const images = req.files.map((image) => image.filename);

      const newPost = new Post({ ...req.body, images, owner: req.user.userId });
      await newPost.save();

      res.json(newPost);
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так" });
    }
  }
);

router.put(
  "/posts/change/:id",
  upload.array("image"),
  userMiddleware,
  async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(500).json({ message: "Такого поста не существует" });
    }

    if (req.query.like) {
      const user = await User.findById(req.user.userId);

      await user.addLikePost(post);
      return res.send(true);
    }

    const images = req.files.map((image) => image.filename);
    Object.assign(post, {
      title: req.body.title,
      text: req.body.text,
      images: [...req.body.currentImages, ...images],
    });

    await post.save();
    res.json({ message: "Пост обновлён", post });
  }
);

router.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(500).json({ message: "Такого поста нету" });

  res.json(post);
});

router.delete("/posts/:id", userMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.images.forEach((image) => {
    fs.unlink(
      path.resolve(__dirname, "../", "static", "images", image),
      (e) => {
        if (e) throw e;
      }
    );
  });

  await Post.deleteOne({ _id: req.params.id, owner: req.user.userId });

  res.json({ message: "Пост удален" });
});

module.exports = router;
