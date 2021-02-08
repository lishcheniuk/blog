import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/actions/posts.action";

export const CreatePost = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    title: "",
    text: "",
    images: [],
  });

  const [indexImage, setIndexImage] = useState(null);

  const changeHandler = (e) => {
    let { name, value } = e.target;

    if (name === "images") {
      const images = [...formValue.images];

      for (let i = 0; i < e.target.files.length; i++) {
        images.push(e.target.files[i]);
      }

      if (images.length < 5) {
        setFormValue({ ...formValue, images });
      }

      return true;
    }

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const isFormValid = useMemo(() => {
    return !formValue.title.trim() || !formValue.text.trim();
  }, [formValue.title, formValue.text]);

  const removeImage = (index) => {
    const images = formValue.images.filter((item, idx) => idx !== index);

    setFormValue({ ...formValue, images });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      return false;
    }

    const res = await dispatch(createPost(formValue));
    res
      ? setFormValue({
          title: "",
          text: "",
          images: [],
        })
      : setFormValue({ ...formValue, images: [] });
  };

  return (
    <div className="row">
      <form
        className="col-6 mx-auto mt-3 py-3"
        style={{ background: "rgba(243, 237, 237, 0.5)" }}
        onSubmit={submitHandler}
      >
        <h3 className="text-center">Создание поста</h3>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Заголовок</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="title"
            value={formValue.title}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Текст</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="text"
            value={formValue.text}
            onChange={changeHandler}
          ></textarea>
        </div>

        <div className="custom-file mb-2 image-file">
          <input
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            className="custom-file-input"
            name="images"
            onChange={changeHandler}
          />
          <label className="custom-file-label" htmlFor="validatedCustomFile">
            Выберите изображение...
          </label>
          {formValue.images.length ? (
            <div className="d-flex mt-2 post-create-image">
              {formValue.images.map((image, index) => (
                <div
                  className="w-25"
                  key={index}
                  onMouseEnter={() => setIndexImage(index)}
                  onMouseLeave={() => setIndexImage(null)}
                >
                  <img src={URL.createObjectURL(image)} alt="" />
                  {index === indexImage && (
                    <button
                      type="button"
                      className="ml-2 mb-1 close"
                      onClick={removeImage.bind(null, index)}
                    >
                      <span>&times;</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn btn-info" disabled={isFormValid}>
          Создать
        </button>
      </form>
    </div>
  );
};
