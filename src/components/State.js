import React from "react";
import { useParams } from "react-router-dom";

const State = ({ states }) => {
  const { id } = useParams();
  const state = states.find((state) => state.id === id);

  return (
    <div className="state-container">
      <h2 className="state-header">{state.name}</h2>
      <p className="state-description">{state.description}</p>
    </div>
  );
};

export default State;
