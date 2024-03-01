import React from "react";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from '../../../components/MobileSideMenu/MobileSideMenu'
import "./dashboard.css";
// import Header from "../../../components/header/header";

const Dashboard=()=>{
  return (
    <div>
    <div className = "mobileSideMenu">
    <AnchorTemporaryDrawer />
    </div>
    <div className = "sideMenu">
      <MiniDrawer />
    </div>
    </div>
  );
}

export default Dashboard;
