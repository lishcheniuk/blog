import {
  FETCH_POSTS,
  CREATE_POST,
  CHANGE_LIKE,
  CHANGE_POST,
  DELETE_POST,
  LOADING,
  FETCH_POST,
} from "../types";
import { setMessage, changeLikeByUser, setIsRequest } from "./auth.action";

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    const res = await fetch("/api/posts");
    const posts = await res.json();

    dispatch({ type: FETCH_POSTS, posts });
    dispatch(setLoading());
  };
};

export const fetchPostById = (id) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch({ type: FETCH_POST, post: data });
      dispatch(setLoading());
    } catch (e) {}
  };
};

export const createPost = ({ title, text, images }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const fd = new FormData();

    fd.append("title", title);
    fd.append("text", text);

    if (images.length) {
      images.forEach((image) => {
        fd.append("image", image, image.name);
      });
    }

    try {
      const res = await fetch("api/posts/create", {
        method: "post",
        body: fd,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Неподдержуемый тип файла");

      const post = await res.json();

      dispatch({ type: CREATE_POST, post });
      dispatch(setMessage({ type: "success", text: "Пост успешно создан" }));
      return true;
    } catch (e) {
      dispatch(setMessage({ type: "danger", text: e.message }));
    }
  };
};

export const editPost = ({ title, text, images, currentImages }, id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const fd = new FormData();

    fd.append("title", title);
    fd.append("text", text);

    currentImages.forEach((image) => fd.append("currentImages[]", image));

    if (images.length) {
      images.forEach((image) => {
        fd.append("image", image, image.name);
      });
    }
    fetch(`/api/posts/change/${id}`, {
      method: "put",
      body: fd,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Нет авторизации");
        return res.json();
      })
      .then((data) => {
        dispatch({ type: CHANGE_POST, post: data.post });
        dispatch(setMessage({ type: "success", text: data.message }));
      })
      .catch((e) => dispatch(setMessage({ type: "danger", text: e.message })));
  };
};

export const likePostA = (id, isLike) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(setIsRequest());

    try {
      const res = await fetch(`/api/posts/change/${id}?like=true`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch({ type: CHANGE_LIKE, id, isLike });
      dispatch(changeLikeByUser(id, isLike));
      dispatch(setIsRequest());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deletePost = (id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    fetch(`/api/posts/${id}`, {
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: DELETE_POST, id });
        dispatch(setMessage({ type: "success", text: data.message }));
      });
  };
};

const setLoading = () => {
  return { type: LOADING };
};
