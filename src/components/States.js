import React from "react";
import { Link } from "react-router-dom";
import connecticutImage from "../images/connecticut.jpg";
import massachusettsImage from "../images/massachusetts.jpg";
import maineImage from "../images/maine.jpg";
import newhamshireImage from "../images/newhampshire.jpg";
import newjerseyImage from "../images/newjersey.jpg";
import newyorkImage from "../images/newyork.jpg";
import pennsylvaniaImage from "../images/pennsylvania.jpg";
import rhodeislandImage from "../images/rhodeisland.jpg";
import vermontImage from "../images/vermont.jpg";

const States = () => {
  const states = [
    { name: "Connecticut", id: "ct", image: connecticutImage },
    { name: "Maine", id: "me", image: maineImage },
    { name: "Massachusetts", id: "ma", image: massachusettsImage },
    { name: "New Hampshire", id: "nh", image: newhamshireImage },
    { name: "New Jersey", id: "nj", image: newjerseyImage },
    { name: "New York", id: "ny", image: newyorkImage },
    { name: "Pennsylvania", id: "pa", image: pennsylvaniaImage },
    { name: "Rhode Island", id: "ri", image: rhodeislandImage },
    { name: "Vermont", id: "vt", image: vermontImage },
  ];

  return (
    <div className="states-container">
      {states.map((state) => (
        <div
          className="state-item"
          key={state.id}
          style={{ backgroundImage: `url(${state.image})` }}
        >
          <h2 className="state-name">{state.name}</h2>
          <Link to={`/state/${state.id}`} state={state}>
            <button className="learn-more-button">Learn More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default States;
