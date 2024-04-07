import { useEffect, useState } from "react";

const useCloudinaryUpload = (cloudinaryConfig) => {
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (image, callback) => {
    try {
      setUploading(true);
  
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
        callback(result.secure_url);
      } else {
        console.error("Failed to upload image to Cloudinary:", response.statusText);
        callback(null);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      callback(null);
    } finally {
      setUploading(false);
    }
  };

  return { uploadToCloudinary, uploading };
};

export default useCloudinaryUpload;
