import React from "react";
import { Link } from "react-router-dom";

const States = ({ states }) => {
  return (
    <div className="states-container">
      {states.map((state) => (
        <div
          className="state-item"
          key={state.id}
          style={{ backgroundImage: `url(${state.image})` }}
        >
          <h2 className="state-name">{state.name}</h2>
          <Link to={`/state/${state.id}`}>
            <button className="learn-more-button">Learn More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default States;
