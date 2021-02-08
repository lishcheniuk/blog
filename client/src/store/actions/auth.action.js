import {
  SET_MESS,
  CLEAR_MESS,
  IS_REQUEST,
  LOGIN,
  CHANGE_LIKE_U,
  LOGOUT,
  CHANGE_INFO,
} from "../types";

export const login = (formValue) => {
  return async (dispatch) => {
    dispatch(setIsRequest());
    try {
      const res = await fetch("/api/auth/login", {
        method: "post",
        body: JSON.stringify(formValue),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Что-то пошло не так");
      }

      if (formValue.checkbox) {
        localStorage.setItem("token", data.token);
      }

      const userInfo = {
        name: data.userInfo.name,
        email: data.userInfo.email,
        avatar: data.userInfo.avatar,
        id: data.userInfo._id,
      };

      dispatch({
        type: LOGIN,
        token: data.token,
        likePosts: data.userInfo.posts.likes,
        userInfo,
      });
      dispatch(setMessage({ text: data.message, type: "success" }));
    } catch (e) {
      dispatch(setMessage({ text: e.message, type: "danger" }));
    } finally {
      dispatch(setIsRequest());
    }
  };
};

export const autoLogin = (token) => {
  return async (dispatch) => {
    try {
      const res = await fetch("/api/auth/auto-login", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const userInfo = {
        name: data.userInfo.name,
        email: data.userInfo.email,
        avatar: data.userInfo.avatar,
        id: data.userInfo._id,
      };

      dispatch({
        type: LOGIN,
        token,
        userInfo,
        likePosts: data.userInfo.posts.likes,
      });
      dispatch(setMessage({ text: data.message, type: "success" }));
    } catch (e) {
      dispatch(setMessage({ text: e.message, type: "danger" }));
      localStorage.removeItem("token");
    }
  };
};

export const register = (formValue) => {
  return async (dispatch) => {
    dispatch(setIsRequest());
    try {
      const res = await fetch("/api/auth/register", {
        method: "post",
        body: JSON.stringify(formValue),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch(setMessage({ text: data.message, type: "success" }));
      dispatch(setIsRequest());
      return true;
    } catch (e) {
      dispatch(setIsRequest());
      dispatch(setMessage({ text: e.message, type: "danger" }));
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};

export const setIsRequest = () => {
  return { type: IS_REQUEST };
};

export const setMessage = (message) => {
  return (dispatch) => {
    dispatch({ type: SET_MESS, message });
    setTimeout(() => dispatch(clearMessage()), 3000);
  };
};

export const clearMessage = () => {
  return { type: CLEAR_MESS };
};

export const changeLikeByUser = (id, isLike) => {
  return {
    type: CHANGE_LIKE_U,
    isLike,
    id,
  };
};

export const changeInfo = ({ name, image }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const fd = new FormData();

    fd.append("name", name);
    if (image) fd.append("image", image, image.name);

    try {
      const res = await fetch("/api/auth/user_info", {
        method: "put",
        body: fd,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch({ type: CHANGE_INFO, name, avatar: data.image });
      dispatch(setMessage({ text: data.message, type: "success" }));
    } catch (e) {
      dispatch(setMessage({ text: e.message, type: "danger" }));
    }
  };
};
