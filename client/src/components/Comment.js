import React from "react";
import date from "../utils/date.filter";

export const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-date">
        <span className="font-weight-bold mr-2">{comment.userId.name}</span>
        {date(comment.date, "datetime")}
      </p>
      {comment.text}
    </div>
  );
};
