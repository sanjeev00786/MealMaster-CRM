import React, { useRef } from 'react';
import '../CustomCamera/CustomCamera.css'
import CameraIcon from '../../component-assets/camera.svg'

const CustomCamera = ({ onImageCapture }) => {
  const videoRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  openCamera();

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    const imageUrl = canvas.toDataURL('image/png');
    onImageCapture(imageUrl);

    // Stop the video stream after capturing the image
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  return (
    <div className="camera-modal">
      {/* Video element to display the camera stream */}
      <video
        ref={videoRef}
        className="camera-video" // Add a class for styling
        autoPlay
        playsInline
      />

      {/* Button to capture the image */}
      <div className='capture-button-container'>
      <img src={CameraIcon} alt="" className="camera-icon"/>
      <button onClick={captureImage} className="capture-button"></button>
      </div>
    </div>
  );
};

export default CustomCamera;