const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comments", commentsSchema);
