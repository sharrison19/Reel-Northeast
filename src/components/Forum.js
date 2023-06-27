import React, { useState, useEffect } from "react";
import CreateThread from "./CreateThread";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const Forum = () => {
  const navigate = useNavigate();
  const handleThread = (thread) => {
    navigate("/thread", { state: thread });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threads, setThreads] = useState([]);
  const [viewedThreadsForum, setViewedThreadsForum] = useState([]);
  const [viewedThreadsThread, setViewedThreadsThread] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("newest");

  const handleThreadSubmit = (newThread) => {
    setThreads([...threads, newThread]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    setSelectedFilter("newest");
    axios
      .get("/forum/threads")
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    viewedThreadsForum.forEach((threadId) => {
      console.log("Thread marked as viewed in the forum:", threadId);
      // Increment the view count in the server for the forum view
      axios
        .put(`/forum/${threadId}/views`)
        .then(() => {
          console.log(
            "View count incremented for thread in the forum:",
            threadId
          );
        })
        .catch((error) => {
          console.error("Failed to increment view count in the forum:", error);
        });
    });
  }, [viewedThreadsForum]);

  const markThreadAsViewed = (threadId) => {
    if (!viewedThreadsThread.includes(threadId)) {
      console.log("Marking thread as viewed in the thread:", threadId);
      setViewedThreadsThread([...viewedThreadsThread, threadId]);
    }
  };
  const filteredThreads = threads
    .filter((thread) => {
      // Check if any selected category is present in the thread's categories
      return (
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          thread.categories.includes(category)
        )
      );
    })
    .sort((a, b) => {
      let aDate = new Date(a.time);
      let bDate = new Date(b.time);

      if (selectedFilter === "newest") {
        return bDate.getTime() - aDate.getTime();
      }
      if (selectedFilter === "oldest") {
        return aDate.getTime() - bDate.getTime();
      }
      if (selectedFilter === "mostComments") {
        return b.totalComments - a.totalComments;
      }
      if (selectedFilter === "mostViews") {
        return b.totalViews - a.totalViews;
      }
      return 0;
    });

  return (
    <div className="forum-page">
      <div className="top-row">
        <div className="thread-btn-container">
          <button className="create-a-thread-btn" onClick={handleOpenModal}>
            Create a Thread
          </button>
        </div>
        {isModalOpen && (
          <CreateThread
            onThreadSubmit={handleThreadSubmit}
            onClose={handleCloseModal}
            selectedCategories={selectedCategories}
          />
        )}
        <div className="search-container">
          <input placeholder="Search" className="search"></input>
          <BsSearch className="search-icon" />
        </div>
      </div>
      <div className="columns">
        <div className="left-column">
          <div>
            <h1 className="categories-title">Categories</h1>
            <ul className="categories-list">
              <li
                className={`category-item ${
                  selectedCategories.includes("Fly Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Fly Fishing")}
              >
                Fly Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Freshwater Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Freshwater Fishing")}
              >
                Freshwater Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Saltwater Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Saltwater Fishing")}
              >
                Saltwater Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Bass Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Bass Fishing")}
              >
                Bass Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Trout Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Trout Fishing")}
              >
                Trout Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Deep Sea Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Deep Sea Fishing")}
              >
                Deep Sea Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Ice Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Ice Fishing")}
              >
                Ice Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Kayak Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Kayak Fishing")}
              >
                Kayak Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Surf Casting Fishing")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Surf Casting Fishing")}
              >
                Surf Casting Fishing
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Bait and Tackle")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Bait and Tackle")}
              >
                Bait and Tackle
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Fishing Gear")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Fishing Gear")}
              >
                Fishing Gear
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Fishing Reports")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Fishing Reports")}
              >
                Fishing Reports
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Fishing Tips and Tricks")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Fishing Tips and Tricks")}
              >
                Fishing Tips and Tricks
              </li>
              <li
                className={`category-item ${
                  selectedCategories.includes("Fishing Conservation")
                    ? "selected-category"
                    : ""
                }`}
                onClick={() => handleCategoryFilter("Fishing Conservation")}
              >
                Fishing Conservation
              </li>
            </ul>
          </div>
        </div>

        <div className="right-column">
          <div className="threads-header">
            <h1 className="threads-title">Threads</h1>
            <select
              className="filter"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option className="filter-option" value="newest">
                Newest
              </option>
              <option className="filter-option" value="oldest">
                Oldest
              </option>
              <option className="filter-option" value="mostViews">
                Most Views
              </option>
              <option className="filter-option" value="mostComments">
                Most Commented
              </option>
            </select>
          </div>

          <div className="threads">
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread, index) => (
                <div
                  onClick={() => {
                    markThreadAsViewed(thread._id);
                    handleThread(thread);
                  }}
                  className="forum-thread"
                  key={index}
                >
                  <h2 className="forum-thread-title">{thread.title}</h2>
                  <div className="forum-thread-info">
                    <div className="forum-thread-info-item">
                      Author:{" "}
                      <span className="forum-thread-author">
                        {thread.author}
                      </span>
                    </div>
                    <div className="forum-thread-info-item">
                      Date:{" "}
                      <span className="forum-thread-date">{thread.date}</span>
                    </div>
                  </div>
                  <div className="forum-thread-info">
                    <div className="forum-thread-info-item">
                      Total Comments:{" "}
                      <span className="forum-thread-total-comments">
                        {thread.totalComments}
                      </span>
                    </div>
                    <div className="forum-thread-info-item">
                      Total Views:{" "}
                      <span className="forum-thread-total-views">
                        {thread.totalViews}
                      </span>
                    </div>
                  </div>
                  <p className="forum-thread-content">{thread.content}</p>
                  <div className="selected-categories">
                    <h4 className="selected-categories-header">Categories:</h4>
                    <ul className="selected-categories-list">
                      {thread.categories.map((category) => (
                        <li key={category} className="selected-categories-item">
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-threads-message">
                There are no threads available for this category. Be the first
                one to start the conversation!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
