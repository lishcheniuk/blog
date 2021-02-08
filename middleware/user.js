const keys = require("../config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(400).json({ message: "Токен не найден" });

    const decoded = jwt.verify(token, keys.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Нет авторизации" });
  }
};
