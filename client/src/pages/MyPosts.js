import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import date from "../utils/date.filter";
import { EditPostModal } from "../components/EditPostModal";
import { editPost, deletePost } from "../store/actions/posts.action";

export const MyPosts = ({ history }) => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.auth);
  const [postIndex, setPostIndex] = useState(null);

  const myPosts = useMemo(() => {
    return allPosts.filter((post) => post.owner === userInfo.id);
  }, [allPosts, userInfo]);

  const openContentPost = (index) => {
    if (index === postIndex) setPostIndex(null);
    else setPostIndex(index);
  };

  const change = (formValue, id) => {
    dispatch(editPost(formValue, id));
  };

  const deleteP = (id) => {
    const answer = window.confirm("Вы уверены, что хотите удалить пост?");

    if (answer) dispatch(deletePost(id));
  };

  return (
    <div className="row">
      {!myPosts.length ? (
        <p className="col-12 mt-5 text-center">
          Постов пока нету
          <span
            className="ml-1 text-info font-weight-bold"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/create_post")}
          >
            [создать]
          </span>
        </p>
      ) : (
        myPosts.map((post, index) => (
          <div className="col-8 mx-auto my-3 shadow my-post" key={index}>
            <div
              className="col-10 p-3"
              onClick={openContentPost.bind(null, index)}
            >
              <p className="font-weight-bold mb-0">
                {index + 1}. {post.title}
              </p>
              {index === postIndex && (
                <div>
                  {post.text}
                  <br />
                  <div className="preview">
                    {post.images.map((image, idx) => (
                      <div className="img-wrap" key={idx}>
                        <img src={`/images/${image}`} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <span>{date(post.date, "datetime")}</span>
            </div>
            <div className="my-post-tools">
              <EditPostModal post={post} change={change} />
              <span
                className="text-danger p-2"
                onClick={deleteP.bind(null, post._id)}
              >
                <i className="fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
