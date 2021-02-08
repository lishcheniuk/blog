import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { Authorization } from "./pages/Authorization";
import { MyPosts } from "./pages/MyPosts";
import { CreatePost } from "./pages/CreatePost";
import { EditPost } from "./pages/EditPost";
import { Profile } from "./pages/Profile";
import { Post } from "./pages/Post";

export const useRouter = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/my_posts" component={MyPosts} />
        <Route path="/create_post" component={CreatePost} />
        <Route path="/edit_post/:id" component={EditPost} />
        <Route path="/post/:id" component={Post} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Posts} />
      <Route path="/login" component={Authorization} />
      <Route path="/post/:id" component={Post} />
      <Redirect to="/" />
    </Switch>
  );
};
