const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "avatar-default.jpg",
  },
  posts: {
    likes: [
      {
        type: Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
});

userSchema.methods.addLikePost = function (post) {
  //this.posts.likes = [];
  let likes = [...this.posts.likes];
  const isLike = likes.some(
    (idPost) => idPost.toString() === post._id.toString()
  );

  if (isLike) {
    post.likes -= 1;
    likes = likes.filter((postId) => postId.toString() !== post._id.toString());
  } else {
    post.likes += 1;
    likes.push(post._id);
  }

  this.posts = { ...this.posts, likes };
  post.save();
  return this.save();
};

module.exports = model("Users", userSchema);
