import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { postsReducer } from "./reducers/posts.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { commentsReducer } from "./reducers/comments.reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  comments: commentsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
