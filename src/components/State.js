import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const State = ({ states }) => {
  const { id } = useParams();
  const state = states.find((state) => state.id === id);
  const [threads, setThreads] = useState([]);

  // Simulating fetching related threads from the backend
  useEffect(() => {
    // Simulated API call delay
    const delay = setTimeout(() => {
      // Simulated fetched threads data
      const fetchedThreads = [
        {
          id: 1,
          title: `Exploring the Best Fishing Spots in ${state.name}`,
          content: `I am looking for the Best Fishing Spots in ${state.name}, does anyone have any suggestions?`,
        },
        {
          id: 2,
          title: `What is your favorite species to target in ${state.name}?`,
          content: `In ${state.name}, I love to fish for Largemouth Bass! What do you fish for?`,
        },
        {
          id: 3,
          title: `Does anyone want to take my boat out with me in${state.name}? Let me know!`,
          content:
            "I have a Bass Boat and looking to fish with someone. My boats name is Reel Pursuit!",
        },
      ];

      setThreads(fetchedThreads);
    }, 1000);

    return () => clearTimeout(delay);
  }, [state.name]);

  return (
    <div className="state-container">
      <h2 className="state-header">{state.name}</h2>
      <p className="state-description">{state.description}</p>

      <h3>Threads related to {state.name}:</h3>
      {threads.length ? (
        <ul className="state-thread-list">
          {threads.map((thread) => (
            <li key={thread.id} className="state-thread-item">
              <h4>{thread.title}</h4>
              <p>{thread.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading threads...</p>
      )}
    </div>
  );
};

export default State;
