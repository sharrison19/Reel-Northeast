import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import getFormattedDate from "../utility/formattedDate";

const CreateThread = ({ onThreadSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !content) {
      alert("Please fill in all the fields");
      return;
    }

    // Create new thread object
    const newThread = {
      title,
      author: auth.username,
      content,
      date: getFormattedDate(),
      comments: [],
      totalComments: 0,
      totalViews: 0,
      id: Date.now(),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/forum",
        newThread
      );

      console.log(response);

      if (!response.status === 201) {
        throw new Error("Failed to create thread");
      }

      // Pass new thread to parent component
      onThreadSubmit(newThread);

      // Clear input fields
      setTitle("");
      setContent("");

      // Close the modal
      onClose();
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the thread");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a New Thread</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
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
