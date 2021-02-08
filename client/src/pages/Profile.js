import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeInfo } from "../store/actions/auth.action";

export const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState(userInfo.name);
  const [image, setImage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name: userName,
      image,
    };
    dispatch(changeInfo(data));
  };

  return (
    <div>
      <h1>Профиль</h1>
      <div className="row">
        <div className="col-6">
          <img className="avatar" src={`/images/${userInfo.avatar}`} alt="" />
        </div>

        <div className="col-6">
          <form onSubmit={submitHandler}>
            <p>
              Ваш email: <strong>{userInfo.email}</strong>
            </p>

            <div className="input-field">
              <label htmlFor="name" className="mr-2">
                Ваше имя:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span className="helper-text"></span>
            </div>

            <div className="custom-file w-50 mb-2 image-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Загрузить аватар...
              </label>
              {image && (
                <div className="w-50 mt-2">
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-info">
              Изменить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
