import { useEffect, useState } from "react";

const useCloudinaryUpload = (cloudinaryConfig) => {
  const [uploading, setUploading] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const uploadToCloudinary = async (image) => {
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
        console.log(result);
        setFilePath(result.secure_url);
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    } finally {
      setUploading(false);
    }
  };

  return { filePath, uploadToCloudinary, uploading };
};

export default useCloudinaryUpload;
