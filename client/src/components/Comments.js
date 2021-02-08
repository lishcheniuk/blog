import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Comment } from "./Comment";

export const Comments = ({ click, token, comments, isRequest }) => {
  const [textComment, setTextComment] = useState("");

  const clickHandler = () => {
    if (textComment.trim()) {
      click(textComment);
      setTextComment("");
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-8 mx-auto">
        <h4>Комментарии</h4>
        {token && (
          <div className="">
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                name="text"
                value={textComment}
                onChange={(e) => setTextComment(e.target.value)}
              ></textarea>
            </div>
            <button
              className="btn btn-info btn-sm"
              onClick={clickHandler}
              disabled={isRequest}
            >
              Отправить
            </button>
          </div>
        )}
        {!comments.length ? (
          <p className="text-center mt-3">Комментариев нету</p>
        ) : (
          <TransitionGroup>
            {comments.map((comment) => (
              <CSSTransition classNames="cmt" timeout={1000} key={comment._id}>
                <Comment comment={comment} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
};
