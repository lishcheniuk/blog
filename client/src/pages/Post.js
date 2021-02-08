import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePostA, fetchPostById } from "../store/actions/posts.action";
import { setMessage } from "../store/actions/auth.action";
import { Comments } from "../components/Comments";
import {
  createComment,
  fetchComments,
  cleanComments,
} from "../store/actions/comments.action";
import { Loader } from "../components/Loader";

export const Post = (props) => {
  const dispatch = useDispatch();

  const { allPosts, loading } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const { likePosts, isRequest, token } = useSelector((state) => state.auth);

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPostById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    dispatch(fetchComments(props.match.params.id));

    return () => dispatch(cleanComments());
  }, [dispatch, props.match.params.id]);

  const post = useMemo(() => {
    return allPosts.find((post) => post._id === props.match.params.id);
  }, [allPosts, props.match.params.id]);

  const isLikePost = useMemo(() => {
    return (postId) => likePosts.includes(postId);
  }, [likePosts]);

  const likePost = (id) => {
    if (isRequest) return false;

    if (!token) {
      return dispatch(
        setMessage({
          type: "warning",
          text: "Вы должны сначала авторизироваться",
        })
      );
    }

    dispatch(likePostA(id, isLikePost(id)));
  };

  const sendComment = (value) => {
    dispatch(
      createComment({
        value,
        token,
        postId: props.match.params.id,
      })
    );
  };

  if (loading) return <Loader />;

  return !post ? (
    <p className="text-center mt-3">Такого поста не существует!</p>
  ) : (
    <React.Fragment>
      <div className="card mt-3 pb-2 mx-auto col-8 shadow">
        <div className="row no-gutters">
          <div
            className="like post-by-id"
            onClick={likePost.bind(null, post._id)}
            style={{ color: isLikePost(post._id) && "green" }}
          >
            <i className="far fa-thumbs-up"></i>
            <span>{post.likes}</span>
          </div>
          <div className="col-md-4 py-2">
            <div className="mb-2">
              <img
                src={`/images/${post.images[imgIndex]}`}
                className="card-img"
                alt="..."
              />
            </div>

            <div className="preview">
              {post.images.map((image, index) => (
                <div
                  className="img-wrap"
                  key={index}
                  onClick={() => setImgIndex(index)}
                >
                  <img src={`/images/${image}`} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-8 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.text}</p>
            </div>
            <button
              className="btn btn-secondary align-self-end"
              onClick={() => props.history.goBack()}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
      <Comments
        click={sendComment}
        token={token}
        comments={comments}
        isRequest={isRequest}
      />
    </React.Fragment>
  );
};
