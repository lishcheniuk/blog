const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  images: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "Users" },
});

module.exports = model("Posts", postSchema);
