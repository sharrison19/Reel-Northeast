import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import getFormattedDate from "../utility/formattedDate";

const CreateThread = ({ onThreadSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setSelectedCategories([]);
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.isAuthenticated) {
      auth.setError("Please log in to create a thread");
      return;
    }

    if (!title || !content || selectedCategories.length === 0) {
      auth.setError(
        "Please fill in all the fields and select at least one category"
      );
      return;
    }

    const newThread = {
      title,
      author: auth.username,
      content,
      date: getFormattedDate(),
      comments: [],
      totalComments: 0,
      totalViews: 0,
      categories: selectedCategories,
      id: Date.now(),
      time: Date.now(),
    };

    try {
      const response = await axios.post("/forum", newThread);

      if (response.status === 201) {
        onThreadSubmit(response.data);
        setTitle("");
        setContent("");
        onClose();
      } else {
        throw new Error("Failed to create thread");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the thread");
    }
  };

  const categoryOptions = [
    "Bait and Tackle",
    "Bass Fishing",
    "Boating",
    "Conservation",
    "Deep Sea",
    "Fly Fishing",
    "Freshwater",
    "Fishing Gear",
    "Fishing Reports",
    "Ice Fishing",
    "Kayak Fishing",
    "Saltwater",
    "Surf Casting",
    "Tips and Tricks",
    "Trout Fishing",
  ];

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
              className="create-thread-content-area"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="modal-categories-label" htmlFor="categories">
              Categories:
            </label>
            <div className="categories-container">
              {categoryOptions.map((category) => (
                <div className="categories-checkbox" key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <label className="categories-label" htmlFor={category}>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
