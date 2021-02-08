const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json({ extended: true }));

app.use("/api", require("./routes/posts.route"));
app.use("/api", require("./routes/auth.route"));
app.use("/api", require("./routes/comments.route"));

async function start() {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
