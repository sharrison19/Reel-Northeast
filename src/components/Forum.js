import React, { useState, useEffect } from "react";
import CreateThread from "./CreateThread";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Forum = () => {
  const navigate = useNavigate();
  const handleThread = (thread) => {
    return () => {
      navigate("/thread", { state: thread });
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threads, setThreads] = useState([
    {
      title: "Best Lure for Bass Fishing?",
      content:
        "I've been trying to catch some bass lately, and I'm wondering what lure works best. Any recommendations? I usually fish in freshwater lakes and rivers. Thanks!",
      author: "Angler123",
      date: "March 30, 2023",
      comments: [{ author: "Jim", content: "Hello", date: "April 1, 2023" }],
      totalComments: 200,
      totalViews: 200,
    },
    {
      title: "Tips for Fly Fishing Beginners",
      content:
        "I'm new to fly fishing and looking for some tips to get started. What are the essential gear and techniques I should know? Any advice would be greatly appreciated!",
      author: "FlyFisher22",
      date: "March 25, 2023",
      comments: [{ author: "Jim", content: "Hello", date: "April 1, 2023" }],
      totalComments: 100,
      totalViews: 1000,
    },
    {
      title: "Share Your Biggest Catch!",
      content:
        "    Let's see who caught the biggest fish! Share a photo of your biggest catch and tell us the story behind it. I'll start with mine, a massive 30-pound striped bass I caught off the coast of Maine last summer. Can't wait to see your impressive catches!",
      author: "BigFisherman",
      date: "June 5, 2023",
      comments: [{ author: "Jim", content: "Hello", date: "April 1, 2023" }],
      totalComments: 1,
      totalViews: 20,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("newest");

  const handleThreadSubmit = (newThread) => {
    // Add the new thread to the list of threads
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
  }, []);

  // Filter threads based on the selected filter option
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
                onClick={handleThread(thread)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
