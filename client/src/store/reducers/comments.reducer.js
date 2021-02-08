import { CREATE_COMMENT, FETCH_COMMENTS, CLEAN_COMMENTS } from "../types";

const initialState = {
  comments: [],
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, comments: action.comments };
    case CREATE_COMMENT:
      return { ...state, comments: [action.comment, ...state.comments] };
    case CLEAN_COMMENTS:
      return { ...state, comments: [] };
    default:
      return state;
  }
};
