import React from "react";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from '../../../components/MobileSideMenu/MobileSideMenu'
import "./social-media.css";
import Lottie from 'react-lottie';
import progressAnimation from '../../../component-assets/progressAnimation.json';
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import { useState } from "react";
import axios from "axios";
// import Header from "../../../components/header/header";

const SocialMedia=()=> {

  const [selectedFile, setSelectedFile] = useState(null);


    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: progressAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make a POST request to the Graph API to upload the file
      const response = await axios.post(
        `https://graph.facebook.com/2651837188309953/photos`,
        formData,
        {
          params: {
            access_token: 'EAANNECmoxmABO671C6Q3narVYAulssu0TZBLizYlO3uCYqmoBc4YfjBOqZBq2AmnkJ7fSBq9VkwAZAyixKWaQDZASHW8gT3SJfLrabuBK4gmYjOz44KRpxsMG5z1rzqO20WOBErR3FpkUYYrB0V64eNv5mjeU9vZBAxZACUijCkaAfCatwRc4B6NSZBVr7AaFAwWHTaKhx0AXQWiHRoZAsYY35xudgu1zIyS0Ppxt0i9bdLTevQUIZBwZB',
            caption: 'Uploaded from my React app!',
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div className="dashboard-container">
    <div className = "mobileSideMenu">
    <AnchorTemporaryDrawer />
    </div>
    <div className="sideBarMenu">
        <SideBarMenu currentPage='social-media'/>
      </div> 
    {/* <div className="WIP">
    <h1 className="dashboard-header">Work In Progress</h1>
    <Lottie options={defaultOptions} height={350} width={350} />
    </div> */}
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    
    </div>

  );
}

export default SocialMedia;
