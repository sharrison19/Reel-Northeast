import React, { useState } from "react";
import johnSmith from "../images/johnsmith.jpg";

const Profile = ({
  username = "FishingDad",
  name = "John Smith",
  state = "Massachusetts",
  biography = "I love fishing",
  profilePicture = johnSmith,
  email = "johnsmith@yahoo.com",
  socialMediaLinks = [
    { url: "facebook.com/johnsmith", platform: "facebook" },
    { url: "reddit.com/johnsmith", platform: "reddit" },
  ],
  isEditable = true,
  onEditProfile,
}) => {
  const [editableProperties, setEditableProperties] = useState({
    username,
    name,
    state,
    biography,
    email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProperties((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile(editableProperties);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2 className="profile-username">
          {isEditable ? (
            <input
              type="text"
              name="username"
              value={editableProperties.username}
              onChange={handleInputChange}
            />
          ) : (
            username
          )}
        </h2>
        <h3 className="profile-name">
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={editableProperties.name}
              onChange={handleInputChange}
            />
          ) : (
            name
          )}
        </h3>
        <div className="profile-contacts">
          <p className="profile-email">
            Email:{" "}
            {isEditable ? (
              <input
                type="text"
                name="email"
                value={editableProperties.email}
                onChange={handleInputChange}
              />
            ) : (
              email
            )}
          </p>
          <p className="profile-state">
            {isEditable ? (
              <input
                type="text"
                name="state"
                value={editableProperties.state}
                onChange={handleInputChange}
              />
            ) : (
              state
            )}
          </p>
          <p className="profile-biography">
            {isEditable ? (
              <textarea
                name="biography"
                value={editableProperties.biography}
                onChange={handleInputChange}
              />
            ) : (
              biography
            )}
          </p>

          {socialMediaLinks && (
            <div className="profile-social-media">
              <p>Follow me:</p>
              <ul>
                {socialMediaLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {isEditable && (
          <div className="profile-edit-controls">
            <button onClick={handleEditProfile}>Save Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
