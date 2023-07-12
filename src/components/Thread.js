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
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
    totalComments,
    totalViews,
  } = thread;

  const [profileId, setProfileId] = useState(null);
  const [updatedComments, setUpdatedComments] = useState([]);
  const [activeReplyComment, setActiveReplyComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentSubmit = (newComments) => {
    if (newComments) {
      setUpdatedComments(newComments);
    }
    setActiveReplyComment("");
  };

  const handleReply = (commentId) => {
    setActiveReplyComment(commentId);
  };

  const handleCommentEdit = async (commentId) => {
    const editComment = (comments) => {
      return comments.map((comment) => {
        if (comment._id === commentId) {
          if (comment.author === auth.username) {
            return {
              ...comment,
              isEditing: true,
              originalContent: comment.content,
            };
          }
        }

        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = editComment(comment.replies);
          return {
            ...comment,
            replies: updatedReplies,
          };
        }

        return comment;
      });
    };

    const updatedCommentList = editComment(updatedComments);

    try {
      await axios.put(`/forum/${_id}/comments/${commentId}`);
      setUpdatedComments(updatedCommentList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSave = async (commentId, editedContent) => {
    const commentSave = (comments) => {
      return comments.map((comment) => {
        if (comment._id === commentId) {
          console.log("test");
          return { ...comment, content: editedContent, isEditing: false };
        }
        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = commentSave(comment.replies);
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });
    };

    const updatedCommentList = commentSave(updatedComments);

    setUpdatedComments(updatedCommentList);

    try {
      await axios.put(`/forum/${_id}/comments/${commentId}`, {
        content: editedContent,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentCancel = async (commentId) => {
    const commentCancel = (comments) => {
      return comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            isEditing: false,
            content: comment.originalContent,
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = commentCancel(comment.replies);
          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });
    };

    const updatedCommentList = commentCancel(updatedComments);

    setUpdatedComments(updatedCommentList);
  };

  const renderComment = (comment, index, nestingLevel = 0, commentId) => {
    const isReply = nestingLevel > 0;
    const commentClass = isReply ? "reply-comment" : "main-comment";
    const replyClass = nestingLevel % 2 === 0 ? "reply-even" : "reply-odd";

    const handleInputChange = (event, commentId) => {
      const updatedContent = event.target.value;
      const inputChange = (comments) => {
        return comments.map((comment) => {
          if (comment._id === commentId) {
            console.log("test");
            return { ...comment, content: updatedContent };
          }
          if (comment.replies && comment.replies.length > 0) {
            const updatedReplies = inputChange(comment.replies);
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
          return comment;
        });
      };

      const updatedCommentList = inputChange(updatedComments);

      setUpdatedComments(updatedCommentList);
    };

    const handleSaveClick = () => {
      handleCommentSave(comment._id, comment.content);
    };

    const handleCancelClick = () => {
      handleCommentCancel(comment._id);
    };

    return (
      <li
        key={comment._id}
        className={`comment ${commentClass} ${isReply ? replyClass : ""}`}
      >
        <div className="top">
          <div className="comment-author-date-container">
            <span className="comment-author">
              <Link
                to={`/profile/${comment.author}`}
                onClick={() => setProfileId(comment.author)}
              >
                {comment.author}
              </Link>
            </span>

            <span className="comment-date">{comment.date}</span>
          </div>
          {auth.isAuthenticated && comment.author === auth.username && (
            <div className="edit-delete-container">
              <button
                className="edit-comment-btn"
                onClick={() => handleCommentEdit(comment._id)}
              >
                Edit
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              </button>
              <button
                className="delete-comment-btn"
                onClick={() => handleCommentDelete(comment._id)}
              >
                Delete
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
              </button>
            </div>
          )}
        </div>
        {comment.isEditing ? (
          <div>
            <textarea
              value={comment.content}
              onChange={(event) => handleInputChange(event, comment._id)}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <p className="comment-content">{comment.content}</p>
        )}
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
        if (comment._id === commentId) {
          if (comment.author === auth.username) {
            return {
              ...comment,
              author: "",
              content: "Comment was deleted",
            };
          }
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
      await axios.delete(`/forum/${_id}/comments/${commentId}`);
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
      setProfileId(response.data.profileId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [_id]);

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
        {updatedComments?.length > 0 ? (
          <>
            <h4>Comments ({updatedComments.length})</h4>
            <ul>
              {updatedComments.map((comment, index) =>
                renderComment(comment, index)
              )}
            </ul>
          </>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      {profileId && <Profile profileId={profileId} />}
    </div>
  );
};

export default Thread;
