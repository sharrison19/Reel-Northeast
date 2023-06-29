import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ReplyComment from "./ReplyComment";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Profile from "./Profile";

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

  const [profileId, setProfileId] = useState(null);

  const [updatedComments, setUpdatedComments] = useState([]);
  const [activeReplyComment, setActiveReplyComment] = useState("");

  const handleCommentSubmit = (newComments) => {
    setUpdatedComments(newComments);
    setActiveReplyComment("");
  };

  const handleReply = (commentId) => {
    setActiveReplyComment(commentId);
  };

  const renderComment = (comment) => {
    console.log(comment);
    return (
      <li key={comment._id} className="comment">
        <span className="comment-author">
          <Link
            to={`/profile/${comment.author}`}
            onClick={() => setProfileId(comment.author)}
          >
            {comment.author}
          </Link>
        </span>

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

        {comment.replies.length > 0 && (
          <ul>
            {comment.replies.map((reply) => {
              return renderComment(reply);
            })}
          </ul>
        )}
      </li>
    );
  };

  const handleCommentDelete = async (commentId) => {
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

    try {
      await axios.patch(
        `http://127.0.0.1:5000/forum/${_id}/comments/${commentId}`,
        {
          author: "", // Set author to empty
          content: "Comment was deleted", // Update content
        }
      );

      setUpdatedComments(updatedCommentList);
    } catch (error) {
      console.error(error);
    }
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
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/forum/${_id}`);
      setUpdatedComments(response.data.comments);
      setProfileId(response.data.profileId); // Update profileId here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [_id]);

  console.log(updatedComments);

  return (
    <div className="individual-thread">
      <h3 className="thread-title">{title}</h3>
      <div className="thread-info">
        <span className="thread-author">
          Author:{" "}
          <Link to={`/profile/${author}`} onClick={() => setProfileId(author)}>
            {author}
          </Link>
        </span>
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
            {updatedComments.map((comment, index) =>
              renderComment(comment, index)
            )}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      {profileId && <Profile profileId={profileId} />}
    </div>
  );
};

export default Thread;
