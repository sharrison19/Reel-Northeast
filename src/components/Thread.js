import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ReplyComment from "./ReplyComment";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";

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
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentSubmit = (newComments) => {
    setUpdatedComments(newComments);
    setActiveReplyComment("");
  };

  const handleReply = (commentId) => {
    setActiveReplyComment(commentId);
  };

  const renderComment = (comment, index, nestingLevel = 0) => {
    const isReply = nestingLevel > 0;
    const commentClass = isReply ? "reply-comment" : "main-comment";
    const replyClass = nestingLevel % 2 === 0 ? "reply-even" : "reply-odd";

    return (
      <li
        key={comment._id}
        className={`comment ${commentClass} ${isReply ? replyClass : ""}`}
      >
        <span className="comment-author">
          <Link
            to={`/profile/${comment.author}`}
            onClick={() => setProfileId(comment.author)}
          >
            {comment.author}
          </Link>
        </span>

        <span className="comment-date">{comment.date}</span>
        {auth.isAuthenticated && comment.author === auth.username && (
          <button
            className="delete-comment-btn"
            onClick={() => handleCommentDelete(comment._id)}
          >
            Delete Comment
            <FontAwesomeIcon icon={faTrash} className="trash-icon" />
          </button>
        )}
        <p className="comment-content">{comment.content}</p>
        <button
          className="reply-comment-btn"
          onClick={() => handleReply(comment._id)}
        >
          <FontAwesomeIcon icon={faReply} className="reply-icon" />
          Reply
        </button>

        {activeReplyComment === comment._id && (
          <ReplyComment
            threadId={_id}
            parentCommentId={comment._id}
            onCommentSubmit={handleCommentSubmit}
          />
        )}

        {comment.replies.length > 0 && (
          <ul className="reply-list">
            {comment.replies.map((reply, replyIndex) => {
              return renderComment(reply, index, nestingLevel + 1);
            })}
          </ul>
        )}
      </li>
    );
  };

  const handleCommentDelete = async (commentId) => {
    const deleteComment = (comments) => {
      return comments.map((comment) => {
        if (comment._id === commentId && comment.author === auth.username) {
          return {
            ...comment,
            author: "", // Set author to empty
            content: "Comment was deleted", // Update content
          };
        }

        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = deleteComment(comment.replies);
          return {
            ...comment,
            replies: updatedReplies,
          };
        }

        return comment;
      });
    };

    const updatedCommentList = deleteComment(updatedComments);

    try {
      await axios.delete(
        `http://127.0.0.1:5000/forum/${_id}/comments/${commentId}`
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
      <div className="thread-header">
        <h3 className="thread-title">{title}</h3>
        <div className="thread-info">
          <span className="thread-author">
            Author:{" "}
            <Link
              to={`/profile/${author}`}
              onClick={() => setProfileId(author)}
            >
              {author}
            </Link>
          </span>
          <span className="thread-date">Date: {date}</span>
        </div>
        <div className="thread-stats">
          <span className="thread-total-comments">
            Total Comments: {totalComments}
          </span>
          <span className="thread-total-views">Total Views: {totalViews}</span>
        </div>
      </div>
      <p className="thread-content">{content}</p>
      <button
        className="create-comment-button"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        {showCommentForm ? "Hide Comment Form" : "Create a Comment"}
      </button>
      {showCommentForm && (
        <CreateComment threadId={_id} onCommentSubmit={handleCommentSubmit} />
      )}
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
