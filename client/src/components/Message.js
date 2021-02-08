import React from "react";

export const Message = ({ message }) => {
  return (
    <div
      className={`alert alert-${message.type} message`}
      style={{ right: message.text && "20px" }}
    >
      {message.text}
    </div>
  );
};
