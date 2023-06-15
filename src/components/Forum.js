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
    .sort((a, b) => {
      if (selectedFilter === "newest") {
        return new Date(b.date) - new Date(a.date);
      }
      if (selectedFilter === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    })
    .filter((thread, index) => {
      if (selectedFilter === "oldest") {
        return index < 5;
      }
      if (selectedFilter === "mostViews") {
        return thread.totalViews > 0;
      }
      return true;
    })
    .sort((a, b) => {
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
              <li className="category-item">Fly Fishing</li>
              <li className="category-item">Freshwater Fishing</li>
              <li className="category-item">Saltwater Fishing</li>
              <li className="category-item">Bass Fishing</li>
              <li className="category-item">Trout Fishing</li>
              <li className="category-item">Deep Sea Fishing</li>
              <li className="category-item">Ice Fishing</li>
              <li className="category-item">Kayak Fishing</li>
              <li className="category-item">Surf Casting Fishing</li>
              <li className="category-item">Bait and Tackle</li>
              <li className="category-item">Fishing Gear</li>
              <li className="category-item">Fishing Reports</li>
              <li className="category-item">Fishing Tips and Tricks</li>
              <li className="category-item">Fishing Conservation</li>
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
            {filteredThreads.map((thread, index) => (
              <div
                onClick={() => {
                  markThreadAsViewed(thread._id); // Assuming the thread ID property is `_id`
                  handleThread(thread);
                }}
                className="thread"
                key={index}
              >
                <h2 className="thread-title">{thread.title}</h2>
                <p className="thread-content">{thread.content}</p>
                <p className="thread-author">Posted By: {thread.author}</p>
                <p className="thread-date">Date: {thread.date}</p>
                <p className="thread-total-comments">
                  Total Comments: {thread.totalComments}
                </p>
                <p className="thread-total-views">
                  Total Views: {thread.totalViews}
                </p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
