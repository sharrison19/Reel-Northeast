import React, { useState } from "react";

const CreateComment = ({ onCommentSubmit }) => {
  const [author, setAuthor] = useState("YourUser123");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!author || !content) {
      alert("Please fill in all the fields");
      return;
    }

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options);

    // Create new comment object
    const newComment = {
      author,
      content,
      date: formattedDate,
    };

    // Pass new comment to parent component
    onCommentSubmit(newComment);

    // Clear input fields
    setAuthor("");
    setContent("");
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
