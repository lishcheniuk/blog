import { CREATE_COMMENT, FETCH_COMMENTS, CLEAN_COMMENTS } from "../types";
import { setMessage, setIsRequest } from "./auth.action";

export const fetchComments = (postId) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`/api/comments/${postId}`);

      const comments = await res.json();

      dispatch({ type: FETCH_COMMENTS, comments });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    dispatch(setIsRequest());
    try {
      const res = await fetch("/api/comment", {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${comment.token}`,
        },
      });

      const data = await res.json();

      dispatch({ type: CREATE_COMMENT, comment: data.comment });
      dispatch(setMessage({ type: "success", text: data.message }));
      dispatch(setIsRequest());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const cleanComments = () => {
  return { type: CLEAN_COMMENTS };
};
