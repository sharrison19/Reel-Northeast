import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ReplyComment from "./ReplyComment";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Thread = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
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

  const [updatedComments, setUpdatedComments] = useState([]);

  const [activeReplyComment, setActiveReplyComment] = useState("");

  const handleCommentSubmit = (newComment, parentId = null) => {
    setUpdatedComments((prevComments) => {
      const commentsArray = Array.isArray(prevComments) ? prevComments : [];
      return [...commentsArray, { ...newComment, parentId }];
    });
  };

  const handleReply = (commentId) => {
    setActiveReplyComment(commentId);
  };

  const handleCommentDelete = (commentId) => {
    const updatedCommentList = updatedComments.map((comment) => {
      if (comment._id === commentId && comment.author === auth.username) {
        return {
          ...comment,
          author: "", // Set author to empty
          content: "Comment was deleted", // Update content
        };
      }
      return comment;
    });

    setUpdatedComments(updatedCommentList);
  };

  const incrementViews = async () => {
    try {
      await axios.put(`/forum/${_id}/views`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    incrementViews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(incrementViews);
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/forum/${_id}`);
      setUpdatedComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [_id]);

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
      <CreateComment threadId={_id} onCommentSubmit={handleCommentSubmit} />
      <div className="thread-comments">
        <h4>Comments ({updatedComments.length})</h4>
        {updatedComments.length > 0 ? (
          <ul>
            {updatedComments.map((comment, index) => (
              <li key={index} className="comment">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
                <p className="comment-content">{comment.content}</p>
                <button
                  className="reply-comment-btn"
                  onClick={() => handleReply(comment._id)}
                >
                  Reply
                </button>

                {activeReplyComment === comment._id && (
                  <ReplyComment
                    threadId={_id}
                    parentCommentId={comment._id}
                    onCommentSubmit={handleCommentSubmit}
                  />
                )}

                {auth.isAuthenticated && comment.author === auth.username && (
                  <button
                    className="delete-comment-btn"
                    onClick={() => handleCommentDelete(comment._id)}
                  >
                    Delete
                  </button>
                )}

                {comment.replyComments && comment.replyComments.length > 0 && (
                  <ul>
                    {comment.replyComments.map((reply, replyIndex) => (
                      <li key={replyIndex} className="reply-comment">
                        <span className="comment-author">{reply.author}</span>
                        <span className="comment-date">{reply.date}</span>
                        <p className="comment-content">{reply.content}</p>
                      </li>
                    ))}
                  </ul>
                )}
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
