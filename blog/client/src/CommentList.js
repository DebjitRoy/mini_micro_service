import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments
    .filter((comment) => comment.status !== "rejected")
    .map((comment) => {
      return (
        <li key={comment.id}>
          {comment.status === "approved"
            ? comment.content
            : "Comment moderation awaiting"}
        </li>
      );
    });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
