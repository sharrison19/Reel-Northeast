import React, { useState } from "react";

const CreateThread = ({ onThreadSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !author || !content) {
      alert("Please fill in all the fields");
      return;
    }

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options);

    // Create new thread object
    const newThread = {
      title,
      author,
      content,
      date: formattedDate,
      comments: [],
      id: Date.now(),
    };

    // Pass new thread to parent component
    onThreadSubmit(newThread);

    // Clear input fields
    setTitle("");
    setAuthor("");
    setContent("");

    // Close the modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a New Thread</h2>
        <form className="new-thread-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
