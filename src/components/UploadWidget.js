import { useRef, useEffect } from "react";

const UploadWidget = ({ onImageUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        maxImageWidth: 400,
      },
      onImageUpload
    );
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  return (
    <div className="upload-widget-button">
      <button onClick={handleOnClick}>Upload Picture</button>
    </div>
  );
};

export default UploadWidget;
