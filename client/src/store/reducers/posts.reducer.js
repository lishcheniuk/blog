import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  CHANGE_LIKE,
  CHANGE_POST,
  DELETE_POST,
  LOADING,
} from "../types";

const initialState = {
  allPosts: [],
  loading: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: !state.loading };
    case FETCH_POSTS:
      return {
        ...state,
        allPosts: action.posts,
      };
    case FETCH_POST:
      const posts = [...state.allPosts];
      const post = posts.some((post) => post._id === action.post._id);

      if (!post) posts.push(action.post);

      return { ...state, allPosts: posts };
    case CHANGE_LIKE:
      const clonePosts = [...state.allPosts];
      const index = clonePosts.findIndex((post) => post._id === action.id);

      clonePosts[index] = {
        ...clonePosts[index],
        likes: action.isLike
          ? clonePosts[index].likes - 1
          : clonePosts[index].likes + 1,
      };

      return { ...state, allPosts: clonePosts };
    case CREATE_POST:
      return { ...state, allPosts: [action.post, ...state.allPosts] };
    case CHANGE_POST:
      const allPosts = [...state.allPosts];
      const idx = allPosts.findIndex((item) => item._id === action.post._id);
      allPosts[idx] = action.post;

      return { ...state, allPosts };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post._id !== action.id),
      };
    default:
      return state;
  }
};
