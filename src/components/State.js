import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const State = ({ states }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const state = states.find((state) => state.id === id);
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  const fetchThreads = async () => {
    try {
      const response = await fetch(`/forum/search/${state.name}`);
      if (!response.ok) {
        throw new Error("Failed to fetch threads");
      }
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error("Error fetching threads:", error);
      setThreads([]);
    }
  };

  const handleThread = (thread) => {
    navigate("/thread", { state: thread });
  };
  useEffect(() => {
    fetchThreads();
  }, [state.name]);

  const sortedThreads = threads.sort((a, b) => {
    const aDate = new Date(a.time);
    const bDate = new Date(b.time);

    return bDate.getTime() - aDate.getTime();
  });

  const recentThreads = sortedThreads.slice(0, 6);

  return (
    <div className="state-container">
      <h2 className="state-header">{state.name}</h2>
      <div className="state-description">{state.description}</div>
      <h3 className="most-recent-header">
        Most Recent Threads Related to {state.name}:
      </h3>
      {recentThreads.length === 0 ? (
        <p className="no-threads-message">
          No threads match your search criteria. Be the first one to start a
          conversation about {state.name}
        </p>
      ) : (
        <ul className="state-thread-list">
          {recentThreads.map((thread, index) => (
            <li
              key={index}
              onClick={() => handleThread(thread)}
              className={`state-thread-item ${
                selectedThread === thread.id ? "selected" : ""
              }`}
            >
              <h4 className="state-thread-title">{thread.title}</h4>
              <div className="state-thread-info">
                <div className="state-thread-info-item">
                  Author:{" "}
                  <span className="state-thread-author">{thread.author}</span>
                </div>
                <div className="state-thread-info-item">
                  Date: <span className="state-thread-date">{thread.date}</span>
                </div>
              </div>
              <div className="state-thread-info">
                <div className="state-thread-info-item">
                  Total Comments:{" "}
                  <span className="state-thread-total-comments">
                    {thread.totalComments}
                  </span>
                </div>
                <div className="state-thread-info-item">
                  Total Views:{" "}
                  <span className="state-thread-total-views">
                    {thread.totalViews}
                  </span>
                </div>
              </div>
              <p className="state-thread-content">{thread.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default State;
