import React, { useRef, useEffect } from 'react';
import '../CustomCamera/CustomCamera.css';
import CameraIcon from '../../component-assets/camera.svg';
import CloseIcon from '../../component-assets/cancel.png'; // Import the close icon

const CustomCamera = ({ onImageCapture, onClose }) => {
  const videoRef = useRef(null);
  let stream = null;

  const openCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    const imageUrl = canvas.toDataURL('image/png');
    onImageCapture(imageUrl);
    stopCamera();
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  useEffect(() => {
    openCamera();
    return () => {
      stopCamera();
    };
  }, []); // Empty dependency array to run once after initial render

  return (
    <div className="camera-modal">
      <div className="close-button-container">
        <img src={CloseIcon} alt="Close" className="close-icon" onClick={handleClose} />
      </div>
      <video
        ref={videoRef}
        className="camera-video"
        autoPlay
        playsInline
      />
      <div className='capture-button-container'>
        <img src={CameraIcon} alt="" className="camera-icon"/>
        <button onClick={captureImage} className="capture-button"></button>
      </div>
    </div>
  );
};

export default CustomCamera;
