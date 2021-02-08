import React from "react";

export const Loader = () => {
  return (
    <div className="text-center mt-5">
      <div
        className="spinner-border text-info"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
