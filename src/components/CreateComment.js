import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import getFormattedDate from "../utility/formattedDate";

const CreateComment = ({ onCommentSubmit, threadId }) => {
  const [content, setContent] = useState("");

  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("Please fill in all the fields");
      return;
    }

    const newComment = {
      author: auth.username,
      content,
      date: getFormattedDate(),
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/forum/${threadId}/comments`,
        newComment
      );

      console.log(response);

      if (response.status !== 201) {
        throw new Error("Failed to create comment");
      }

      onCommentSubmit(response.data.comments);

      // Clear input fields
      setContent("");
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
