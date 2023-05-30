import React, { useState } from "react";
import CreateComment from "./CreateComment";
import { useLocation } from "react-router-dom";

const Thread = ({ thread }) => {
  const location = useLocation();
  const { title, author, content, date, comments } = location.state;

  const [updatedComments, setUpdatedComment] = useState(comments);

  const handleCommentSubmit = (newComment) => {
    // Add the new comment to the comments array
    setUpdatedComment([...comments, newComment]);
  };
  return (
    <div className="thread">
      <h3 className="thread-title">{title}</h3>
      <div className="thread-info">
        <span className="thread-author">Author: {author}</span>
        <span className="thread-date">Date: {date}</span>
      </div>
      <p className="thread-content">{content}</p>
      <CreateComment onCommentSubmit={handleCommentSubmit} />
      <div className="thread-comments">
        <h4>Comments ({comments.length})</h4>
        {updatedComments.length > 0 ? (
          <ul>
            {updatedComments.map((comment, index) => (
              <li key={index} className="comment">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
                <p className="comment-content">{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Thread;
