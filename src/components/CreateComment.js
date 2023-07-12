import React, { useState } from "react";
import axios from "axios";
import getFormattedDate from "../utility/formattedDate";

const CreateComment = ({ onCommentSubmit, threadId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("Please fill in all the fields");
      return;
    }

    const newComment = {
      content,
      date: getFormattedDate(),
    };

    try {
      const response = await axios.post(
        `/forum/${threadId}/comments`,
        newComment
      );

      if (response.status === 201) {
        onCommentSubmit(response.data.comments);
        setContent("");
      } else {
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the comment");
    }
  };

  return (
    <form className="create-comment-form" onSubmit={handleSubmit}>
      <h4 className="create-comment-header">Create a Comment</h4>
      <div className="create-comment-form-group">
        <textarea
          className="create-comment-content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="create-comment-submit">
        Submit
      </button>
    </form>
  );
};

export default CreateComment;
