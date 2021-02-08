const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config");
const User = require("../models/auth.model");
const userMiddleware = require("../middleware/user");
const upload = require("../middleware/upload");

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });

  if (!candidate) {
    return res
      .status(401)
      .json({ message: "Такого пользователя не существует" });
  }

  const isMatch = await bcrypt.compare(password, candidate.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Email или пароль введен неправильно" });
  }

  const token = jwt.sign({ userId: candidate._id }, keys.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    message: `Добро пожаловать ${candidate.name}`,
    token,
    userInfo: candidate,
  });
});

router.get("/auth/auto-login", userMiddleware, async (req, res) => {
  const candidate = await User.findById(req.user.userId);

  if (!candidate) {
    return res
      .status(401)
      .json({ message: "Такого пользователя не существует" });
  }

  res.status(200).json({
    message: `Добро пожаловать ${candidate.name}`,
    userInfo: candidate,
  });
});

router.post("/auth/register", async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    return res.status(400).json({ message: "Такой email уже существует" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = new User({ ...req.body, password: hashedPassword });

  await newUser.save();

  res.json({
    message: "Пользователь успешно создан. Теперь можете авторизироваться",
  });
});

router.put(
  "/auth/user_info",
  userMiddleware,
  upload.single("image"),
  async (req, res) => {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(500).json({ message: "Ошибка. Что-то пошло не так" });
    }
    user.name = req.body.name || user.name;
    user.avatar = req.file ? req.file.filename : user.avatar;

    await user.save();
    res.json({ message: "Изменения сохранены", image: user.avatar });
  }
);

module.exports = router;
