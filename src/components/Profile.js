import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";

const Profile = ({
  username = "FishingDad",
  name = "John Smith",
  state = "Massachusetts",
  biography = "I love fishing",
  profilePicture = "",
  email = "johnsmith@yahoo.com",
  socialMediaLinks = [
    { url: "facebook.com/johnsmith", platform: "Facebook" },
    { url: "instagram.com/johnsmith", platform: "Instagram" },
    { url: "reddit.com/johnsmith", platform: "Reddit" },
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
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(profilePicture);

  useEffect(() => {
    // Fetch profile data from the backend here
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Make an API call to fetch the profile data
      const response = await axios.get("/profile"); // Replace with your backend API endpoint for fetching profile data
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
      // Handle the error (e.g., show an error message)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProperties((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const response = await axios.put(`/profile`, editableProperties);
      console.log(response.data); // Optional: Handle the success response

      // Update the profile picture if it has changed
      if (uploadedImage !== profilePicture) {
        // Perform the necessary logic for updating the profile picture
        // You can use a separate API endpoint or include it in this PUT request
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error (e.g., show an error message)
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

  console.log(editableProperties);

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
                Choose File
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
          <div className={`profile-username ${isEditing ? "is-editing" : ""}`}>
            {isEditing ? (
              <div>
                <label htmlFor="username-input">Username:</label>
                <input
                  id="username-input"
                  type="text"
                  name="username"
                  value={editableProperties.username}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              editableProperties.username
            )}
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

            {editableProperties.socialMediaLinks && (
              <div
                className={`profile-social-media ${
                  isEditing ? "is-editing" : ""
                }`}
              >
                <p>Follow me:</p>
                <ul>
                  {editableProperties.socialMediaLinks.map((link, index) => (
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
