import React, { useState, useEffect, useContext } from "react";
import CreateThread from "./CreateThread";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "./AuthContext";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "Bait and Tackle",
    "Bass Fishing",
    "Deep Sea Fishing",
    "Fishing Conservation",
    "Fishing Gear",
    "Fishing Reports",
    "Fishing Tips and Tricks",
    "Fly Fishing",
    "Freshwater Fishing",
    "Ice Fishing",
    "Kayak Fishing",
    "Saltwater Fishing",
    "Surf Casting Fishing",
    "Trout Fishing",
  ];

  const { isAuthenticated } = useContext(AuthContext);

  const handleThreadSubmit = (newThread) => {
    setThreads([...threads, newThread]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleCategories = () => {
    setShowCategories((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowCategories(window.innerWidth > 735);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    axios
      .get(`/forum/search/${searchQuery}`)
      .then((response) => {
        console.log(response);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
    setIsLoading(true);
    axios
      .get("/forum/threads")
      .then((response) => {
        setTimeout(() => {
          setThreads(response.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    viewedThreadsForum.forEach((threadId) => {
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

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(null);
    }
  }, [searchQuery]);

  const markThreadAsViewed = (threadId) => {
    if (!viewedThreadsThread.includes(threadId)) {
      setViewedThreadsThread([...viewedThreadsThread, threadId]);
    }
  };
  const filteredThreads =
    searchResults !== null
      ? searchResults
      : threads
          .filter((thread) => {
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
      {window.innerWidth < 526 ? (
        <div className="top-row">
          <div className="search-container">
            <input
              placeholder="Search"
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <BsSearch className="search-icon" onClick={handleSearch} />
          </div>
          {isAuthenticated && (
            <div className="thread-btn-container">
              <button className="create-a-thread-btn" onClick={handleOpenModal}>
                Create a Thread
              </button>
            </div>
          )}
          {isModalOpen && (
            <CreateThread
              onThreadSubmit={handleThreadSubmit}
              onClose={handleCloseModal}
              selectedCategories={selectedCategories}
            />
          )}
        </div>
      ) : (
        <div className="top-row">
          {isAuthenticated && (
            <div className="thread-btn-container">
              <button className="create-a-thread-btn" onClick={handleOpenModal}>
                Create a Thread
              </button>
            </div>
          )}
          {isModalOpen && (
            <CreateThread
              onThreadSubmit={handleThreadSubmit}
              onClose={handleCloseModal}
              selectedCategories={selectedCategories}
            />
          )}
          <div className="search-container">
            <input
              placeholder="Search"
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <BsSearch className="search-icon" onClick={handleSearch} />
          </div>
        </div>
      )}
      <div className="columns">
        <div className="left-column">
          <div>
            <h1 className="categories-title">Categories</h1>
            <button
              className="toggle-categories-btn"
              onClick={handleToggleCategories}
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </button>
            {showCategories && (
              <ul className="categories-list">
                {categories.sort().map((category) => (
                  <li
                    key={category}
                    className={`category-item ${
                      selectedCategories.includes(category)
                        ? "selected-category"
                        : ""
                    }`}
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
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
            {isLoading ? (
              <div className="spinner"></div>
            ) : filteredThreads && filteredThreads.length > 0 ? (
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
                  <div className="forum-thread-stats">
                    <div className="forum-thread-stats-item">
                      Total Comments:{" "}
                      <span className="forum-thread-total-comments">
                        {thread.totalComments}
                      </span>
                    </div>
                    <div className="forum-thread-stats-item">
                      Total Views:{" "}
                      <span className="forum-thread-total-views">
                        {thread.totalViews}
                      </span>
                    </div>
                  </div>
                  <div className="forum-thread-content">{thread.content}</div>
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
                No threads match your search criteria. Be the first one to start
                a conversation on this topic!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
