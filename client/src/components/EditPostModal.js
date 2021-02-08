import React, { useState, useMemo } from "react";
import { CSSTransition } from "react-transition-group";

export const EditPostModal = ({ post, change }) => {
  const [formValue, setFormValue] = useState({
    title: post.title,
    text: post.text,
    images: [],
    currentImages: [...post.images],
  });

  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState(null);

  const allImagesLength = useMemo(() => {
    return formValue.currentImages.length + formValue.images.length;
  }, [formValue.currentImages, formValue.images]);

  const isFormValid = useMemo(() => {
    return !formValue.title.trim() || !formValue.text.trim();
  }, [formValue.title, formValue.text]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const changeHandlerImage = (e) => {
    const { files } = e.target;

    if (allImagesLength + files.length < 5) {
      setFormValue({ ...formValue, images: [...formValue.images, ...files] });
    }
  };

  const removeImage = (index, current = false) => {
    if (current) {
      const currentImages = formValue.currentImages.filter(
        (item, idx) => idx !== index
      );

      return setFormValue({ ...formValue, currentImages });
    }

    const images = formValue.images.filter((item, idx) => idx !== index);

    setFormValue({ ...formValue, images });
  };

  const submitHandler = () => {
    if (isFormValid) {
      return false;
    }

    change(formValue, post._id);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <span className="text-info p-2" onClick={() => setShowModal(true)}>
        <i className="fas fa-edit"></i>
      </span>
      <CSSTransition
        in={showModal}
        timeout={500}
        classNames="os"
        unmountOnExit
        mountOnEnter
      >
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
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
                    onChange={changeHandlerImage}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="validatedCustomFile"
                  >
                    Выберите изображение...
                  </label>
                  {allImagesLength ? (
                    <div className="d-flex mt-2 post-create-image">
                      {formValue.currentImages.length
                        ? formValue.currentImages.map((image, index) => (
                            <div
                              className="w-25"
                              key={index}
                              onMouseEnter={() => setImageName(image)}
                              onMouseLeave={() => setImageName(null)}
                            >
                              <img src={`/images/${image}`} alt="" />
                              {image === imageName && (
                                <button
                                  type="button"
                                  className="ml-2 mb-1 close"
                                  onClick={removeImage.bind(null, index, true)}
                                >
                                  <span>&times;</span>
                                </button>
                              )}
                            </div>
                          ))
                        : ""}
                      {formValue.images.length
                        ? formValue.images.map((image, index) => (
                            <div
                              className="w-25"
                              key={index}
                              onMouseEnter={() => setImageName(image.name)}
                              onMouseLeave={() => setImageName(null)}
                            >
                              <img src={URL.createObjectURL(image)} alt="" />
                              {image.name === imageName && (
                                <button
                                  type="button"
                                  className="ml-2 mb-1 close"
                                  onClick={() => removeImage(index)}
                                >
                                  <span>&times;</span>
                                </button>
                              )}
                            </div>
                          ))
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};
