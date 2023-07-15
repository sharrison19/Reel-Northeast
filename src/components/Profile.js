import React, { useState, useEffect, useContext } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import UploadWidget from "./UploadWidget";
import { AuthContext } from "./AuthContext";

const Profile = ({ onEditProfile, profilePicture = "", isEditable = true }) => {
  const [editableProperties, setEditableProperties] = useState({
    username: "",
    name: "",
    state: "",
    biography: "",
    email: "",
    socialMediaLinks: [
      {
        url: "",
        platform: "facebook",
      },
      {
        url: "",
        platform: "instagram",
      },
      { url: "", platform: "twitter" },
      { url: "", platform: "youtube" },
    ],
    profilePicture: profilePicture || "",
  });

  const auth = useContext(AuthContext);

  const icons = [];
  icons["facebook"] = <FaFacebook />;
  icons["twitter"] = <FaTwitter />;
  icons["instagram"] = <FaInstagram />;
  icons["youtube"] = <FaYoutube />;

  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      let response;
      if (id) {
        response = await axios.get(`/user-profile/${id}`);
      } else {
        response = await axios.get("/user-profile");
      }
      const profileData = response.data;
      setEditableProperties(profileData);
    } catch (error) {
      auth.setError("Error fetching profile data");
    }
  };

  const handleSocialMediaLinkChange = (e) => {
    const { name, value } = e.target;

    const updatedLinks = editableProperties.socialMediaLinks.map((link) => {
      if (link.platform === name) {
        link.url = value;
      }
      return link;
    });

    setEditableProperties({
      ...editableProperties,
      socialMediaLinks: updatedLinks,
    });
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
    let url;
    try {
      editableProperties.socialMediaLinks.map((link) => {
        if (link.url) {
          url = new URL(link.url);
        }
        return link;
      });
    } catch (error) {
      auth.setError("Social media link URL invalid");
      return;
    }

    setIsEditing(false);

    try {
      const response = await axios.put(`/user-profile`, editableProperties);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (error, result) => {
    if (!error && result && result.event === "success") {
      const imageUrl = result.info.path;
      setEditableProperties((prevProps) => ({
        ...prevProps,
        profilePicture: imageUrl,
      }));

      axios
        .put("/user-profile", {
          ...editableProperties,
          profilePicture: imageUrl,
        })
        .then((response) => {
          console.log("Profile picture updated successfully");
        })
        .catch((error) => {
          console.error("Error updating profile picture", error);
        });
    }
  };

  return (
    <div className="profile-background">
      <div className={`profile-container ${isEditing ? "is-editing" : ""}`}>
        <div className="profile-picture-container">
          <Image
            cloudName="reel-northeast-cloud"
            publicId={
              editableProperties.profilePicture || "defaultprofilepicture.jpg"
            }
            width="150"
            height="150"
            crop="fill"
          />
        </div>

        {isEditable && isEditing && (
          <div className="upload-widget-container">
            <UploadWidget onImageUpload={handleImageUpload} />
          </div>
        )}

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
                    <option value="New Jersey">New Jersey</option>
                    <option value="New York">New York</option>
                    <option value="Pennsylvania">Pennsylvania</option>
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
            {isEditing ? (
              <div
                className={`social-media-links ${
                  isEditing ? "is-editing" : ""
                }`}
              >
                {editableProperties.socialMediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`social-media-link-${link.platform.toLowerCase()} ${
                      link.isEditing ? "is-editing" : ""
                    }`}
                  >
                    <div>
                      <label htmlFor={`url-input-${link.platform}`}>
                        {link.platform}:
                      </label>
                      <input
                        id={`url-input-${link.platform}`}
                        type="text"
                        name={link.platform}
                        value={link.url}
                        onChange={(e) => handleSocialMediaLinkChange(e)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="social-media-links">
                {editableProperties.socialMediaLinks.map((link, index) => (
                  <>
                    {link?.url !== "" && (
                      <div
                        key={index}
                        className={`social-media-link ${link.platform.toLowerCase()} ${
                          link.isEditing ? "is-editing" : ""
                        }`}
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icons[link.platform]} {link.platform}
                        </a>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
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
