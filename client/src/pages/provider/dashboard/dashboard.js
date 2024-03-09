import React from "react";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import "./dashboard.css";
import Lottie from "react-lottie";
import progressAnimation from "../../../component-assets/progressAnimation.json";
// import MiniDrawer from "../../../components/SideMenu/SideMenu";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";

const Dashboard = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: progressAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="dashboardPage">
      <div className="sideBarMenu">
        <SideBarMenu currentPage='/dashboard' />
      </div>
      <div className="WIP">
        <h1 className="dashboard-header">Work In Progress</h1>
        <Lottie options={defaultOptions} height={350} width={350} />
      </div>
    </div>
  );
};

export default Dashboard;
