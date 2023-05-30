import React from "react";
import { useParams } from "react-router-dom";

const State = ({ states }) => {
  const { id } = useParams();
  const state = states.find((state) => state.id === id);

  return (
    <div>
      <h2>{state.name}</h2>
      {/* Add more details or content for the specific state */}
    </div>
  );
};

export default State;
