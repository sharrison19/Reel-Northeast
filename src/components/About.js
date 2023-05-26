import React from "react";
import aboutme from "../images/aboutme.jpg";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Reel Northeast</h1>
      <img className="about-image" src={aboutme} alt="about me" />
      <p className="about-paragraph">
        Hello! My name is Sean Harrison, and I'm an avid angler and nature lover
        based in Worcester, Massachusetts. Fishing has been my passion for as
        long as I can remember. It's not just a hobby for me; it's a way of
        life. From the moment my father took me fishing as a child, I was
        hooked. Since then, I have spent countless hours exploring the lakes,
        rivers, and coastlines of the Northeast, honing my skills and deepening
        my love for the sport.
      </p>
      <p className="about-paragraph">
        Through this website, Reel Northeast, I aim to share my knowledge,
        experiences, and love for fishing with others. Fishing is more than just
        a recreational activity for me; it's a profound connection to nature and
        a means of rejuvenation. It's a way to escape the hustle and bustle of
        everyday life and immerse myself in the tranquility of the great
        outdoors. I believe that fishing has the power to bring people together,
        foster a sense of camaraderie, and create unforgettable memories.
      </p>
      <p className="about-paragraph">
        Reel Northeast is a community-driven forum dedicated to fishing in the
        Northeast region. Whether you're a beginner who wants to learn the
        basics or an experienced angler looking to share your expertise, this
        forum provides a platform to connect with fellow fishing enthusiasts in
        the Northeast. Share your fishing stories, exchange tips and tricks, ask
        questions, and engage in discussions about various fishing topics. It's
        a place to learn from one another, inspire and be inspired, and foster a
        sense of community among passionate anglers.
      </p>
      <p className="about-paragraph">
        Join the conversation and become a part of our growing community!
        Together, we'll explore the rich fishing opportunities that the
        Northeast has to offer. From casting a line in the tranquil lakes
        nestled in the picturesque mountains to battling the mighty striped bass
        along the coastal shores, the Northeast is a haven for anglers of all
        levels. Let's embark on this fishing journey together, learn from each
        other, and create lasting connections that extend beyond the virtual
        world. Welcome to Reel Northeast!
      </p>
    </div>
  );
};

export default About;
