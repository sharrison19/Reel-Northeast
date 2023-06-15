import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import { useLocation } from "react-router-dom";

const Thread = () => {
  const location = useLocation();
  const thread = location.state;
  const {
    _id,
    title,
    author,
    content,
    date,
    comments,
    totalComments,
    totalViews,
  } = thread;

  const [updatedComments, setUpdatedComments] = useState(comments);

  const handleCommentSubmit = (newComment) => {
    setUpdatedComments((prevComments) => [...prevComments, newComment]);
  };

  const incrementViews = async (threadId) => {
    try {
      await axios.put(`/forum/${threadId}/views`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    incrementViews(_id); // Pass the threadId parameter
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/forum/${_id}`);
      setUpdatedComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="individual-thread">
      <h3 className="thread-title">{title}</h3>
      <div className="thread-info">
        <span className="thread-author">Author: {author}</span>
        <span className="thread-date">Date: {date}</span>
        <span className="thread-total-comments">
          Total Comments: {totalComments}
        </span>
        <span className="thread-total-views">Total Views: {totalViews}</span>
      </div>
      <p className="thread-content">{content}</p>
      <CreateComment
        threadId={thread._id}
        onCommentSubmit={handleCommentSubmit}
      />
      <div className="thread-comments">
        <h4>Comments ({updatedComments.length})</h4>
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
