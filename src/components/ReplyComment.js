import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import getFormattedDate from "../utility/formattedDate";

const ReplyComment = ({
  threadId,
  commentId,
  commentUserId,
  parentCommentId,
  onCommentSubmit,
}) => {
  const [content, setContent] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("Please fill in all the fields");
      return;
    }

    const newReplyComment = {
      author: auth.username,
      content,
      date: getFormattedDate(),
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/forum/${threadId}/comments/${commentId}/reply`,
        newReplyComment
      );

      console.log(response);

      if (response.status !== 201) {
        throw new Error("Failed to create reply comment");
      }

      onCommentSubmit(newReplyComment);

      // Clear input fields
      setContent("");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the reply comment");
    }
  };

  const handleCancel = () => {
    // Reset the input fields and cancel the reply
    setContent("");
    onCommentSubmit(null);
  };

  return (
    <div id="reply-comment-container">
      <form className="reply-comment-form" onSubmit={handleSubmit}>
        <h4 className="reply-comment-header">Reply to Comment</h4>
        <div className="reply-comment-form-group">
          <textarea
            className="reply-comment-content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="reply-comment-button-group">
          <button type="submit" className="reply-comment-submit">
            Submit
          </button>
          <button className="reply-comment-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyComment;
