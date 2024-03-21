import React from "react";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from '../../../components/MobileSideMenu/MobileSideMenu'
import "./social-media.css";
import Lottie from 'react-lottie';
import progressAnimation from '../../../component-assets/progressAnimation.json';
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
// import Header from "../../../components/header/header";

const SocialMedia=()=> {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: progressAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
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
    <div className="WIP">
    <h1 className="dashboard-header">Work In Progress</h1>
    <Lottie options={defaultOptions} height={350} width={350} />
    </div>
    
    </div>

  );
}

export default SocialMedia;
