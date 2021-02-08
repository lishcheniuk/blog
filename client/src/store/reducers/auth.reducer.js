import {
  LOGIN,
  SET_MESS,
  CLEAR_MESS,
  IS_REQUEST,
  CHANGE_LIKE_U,
  LOGOUT,
  CHANGE_INFO,
} from "../types";

const initialState = {
  token: "",
  message: { type: "", text: "" },
  isRequest: false,
  userInfo: {},
  likePosts: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
        likePosts: action.likePosts,
      };
    case LOGOUT:
      return { ...state, token: "", userInfo: {}, likePosts: [] };
    case CHANGE_LIKE_U:
      const likePosts = [...state.likePosts];
      const idx = likePosts.indexOf(action.id);

      if (action.isLike) {
        likePosts.splice(idx, 1);
      } else {
        likePosts.push(action.id);
      }

      return { ...state, likePosts };
    case CHANGE_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          name: action.name,
          avatar: action.avatar,
        },
      };
    case SET_MESS:
      return { ...state, message: { ...action.message } };
    case CLEAR_MESS:
      return { ...state, message: { type: "", text: "" } };
    case IS_REQUEST:
      return { ...state, isRequest: !state.isRequest };
    default:
      return state;
  }
};
