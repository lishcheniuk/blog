import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { likePostA, fetchPosts } from "../store/actions/posts.action";
import { setMessage } from "../store/actions/auth.action";
import { Loader } from "../components/Loader";

export const Posts = () => {
  const dispatch = useDispatch();
  const { allPosts, loading } = useSelector((state) => state.posts);
  const { token, likePosts, isRequest } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isLikePost = useMemo(() => {
    return (postId) => likePosts.includes(postId);
  }, [likePosts]);

  const likePost = (id) => {
    if (isRequest) return false;

    if (!token)
      return dispatch(
        setMessage({
          type: "warning",
          text: "Вы должны сначала авторизироваться",
        })
      );

    dispatch(likePostA(id, isLikePost(id)));
  };

  if (loading) return <Loader />;

  if (!allPosts.length)
    return <p className="text-center mt-3">Постов пока нету</p>;

  return (
    <div className="row justify-content-center">
      {allPosts.map((item) => (
        <div className="col-12" key={item.title}>
          <div className="shadow mx-auto post">
            <div
              className="like"
              onClick={likePost.bind(null, item._id)}
              style={{ color: isLikePost(item._id) && "green" }}
            >
              <i className="far fa-thumbs-up"></i>
              <span>{item.likes}</span>
            </div>
            <h3 className="text-center">{item.title}</h3>
            <div className="img-wrap my-3">
              <img src={`/images/${item.images[0]}`} alt="" />
            </div>
            <div className="post-content mx-3">
              <p>
                {item.text.length > 180
                  ? item.text.slice(0, 180) + "..."
                  : item.text}
              </p>
              <Link to={`/post/${item._id}`} className="btn btn-sm btn-info">
                Перейти далее
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
