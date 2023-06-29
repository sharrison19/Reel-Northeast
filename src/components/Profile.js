import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Profile = ({
  username = "",
  name = "",
  state = "",
  biography = "",
  profilePicture = "",
  email = "",
  socialMediaLinks = [
    {
      url: "facebook.com/johnsmith",
      platform: "Facebook",
      icon: <FaFacebook />,
    },
    {
      url: "instagram.com/johnsmith",
      platform: "Instagram",
      icon: <FaInstagram />,
    },
    { url: "twitter.com/johnsmith", platform: "Twitter", icon: <FaTwitter /> },
    { url: "youtube.com/johnsmith", platform: "YouTube", icon: <FaYoutube /> },
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
  const [editableSocialMediaLinks, setEditableSocialMediaLinks] = useState([
    ...socialMediaLinks,
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(profilePicture);
  const { id } = useParams();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      let response;
      if (id) {
        response = await axios.get(`/profile/${id}`);
      } else {
        response = await axios.get("/profile");
      }
      const profileData = response.data;
      console.log(profileData);
      setEditableProperties(profileData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const updateProfileData = async () => {
    try {
      // Make an API call to update the profile data
      await axios.put("/profile", editableProperties); // Replace with your backend API endpoint for updating profile data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSocialMediaLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLinks = [...editableSocialMediaLinks];
    updatedLinks[index][name] = value;
    setEditableSocialMediaLinks(updatedLinks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      return;
    }
    setEditableProperties((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const response = await axios.put(`/profile`, editableProperties);
      console.log(response.data);

      if (uploadedImage !== profilePicture) {
        // Handle the profile picture update here
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Reel_Northeast");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/reel-northeast-cloud/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadedImage(response.data.secure_url);
      // Update the profile picture URL in the editable properties
      setEditableProperties((prevProps) => ({
        ...prevProps,
        profilePicture: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <div className="profile-background">
      <div className={`profile-container ${isEditing ? "is-editing" : ""}`}>
        <div className="profile-picture">
          {isEditing ? (
            <div className="file-upload-container">
              <Image
                cloudName="reel-northeast-cloud"
                publicId={uploadedImage || "defaultprofilepicture.jpg"}
                width="150"
                height="150"
                crop="fill"
              />
              <label htmlFor="file-upload" className="file-upload-button">
                Upload Profile Picture
              </label>
              <input
                id="file-upload"
                type="file"
                className="file-input"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <Image
              cloudName="reel-northeast-cloud"
              publicId={uploadedImage || "defaultprofilepicture.jpg"}
              width="150"
              height="150"
              crop="fill"
            />
          )}
        </div>

        <div className="profile-info">
          <div className={"profile-username"}>
            {editableProperties.username}
          </div>
          <div className={`profile-name ${isEditing ? "is-editing" : ""}`}>
            {isEditing ? (
              <div>
                <label htmlFor="name-input">Name:</label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={editableProperties.name}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              editableProperties.name
            )}
          </div>
          <div className="profile-contacts">
            <div className={`profile-email ${isEditing ? "is-editing" : ""}`}>
              {isEditing ? (
                <div>
                  <label htmlFor="email-input">Email:</label>
                  <input
                    id="email-input"
                    type="text"
                    name="email"
                    value={editableProperties.email}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                editableProperties.email
              )}
            </div>
            <div className={`profile-state ${isEditing ? "is-editing" : ""}`}>
              {isEditing ? (
                <div>
                  <label htmlFor="state-select">State:</label>
                  <select
                    id="state-select"
                    name="state"
                    value={editableProperties.state}
                    onChange={handleInputChange}
                  >
                    <option value="Connecticut">Connecticut</option>
                    <option value="Maine">Maine</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="Vermont">Vermont</option>
                  </select>
                </div>
              ) : (
                editableProperties.state
              )}
            </div>
            <div
              className={`profile-biography ${isEditing ? "is-editing" : ""}`}
            >
              {isEditing ? (
                <div>
                  <label htmlFor="biography-textarea">Biography:</label>
                  <textarea
                    id="biography-textarea"
                    name="biography"
                    value={editableProperties.biography}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                editableProperties.biography
              )}
            </div>
            <p>Follow me:</p>
            <div className="social-media-links">
              {editableSocialMediaLinks.map((link, index) => (
                <div
                  key={index}
                  className={`social-media-link ${link.platform.toLowerCase()}`}
                >
                  {isEditing ? (
                    <div>
                      <label htmlFor={`url-input-${index}`}>URL:</label>
                      <input
                        id={`url-input-${index}`}
                        type="text"
                        name="url"
                        value={link.url}
                        onChange={(e) => handleSocialMediaLinkChange(index, e)}
                      />
                    </div>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon} {link.platform}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          {isEditable && (
            <div className="profile-edit-controls">
              {isEditing ? (
                <button
                  className="save-profile-button"
                  onClick={handleSaveClick}
                >
                  Save Profile
                </button>
              ) : (
                <button
                  className="edit-profile-button"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
