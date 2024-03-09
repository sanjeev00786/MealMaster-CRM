import React from "react";
import "./dashboard.css";
import RevenueGraph from "./revenue-graph";
import CustomerGraph from "./new-customers-graph";
// import MiniDrawer from "../../../components/SideMenu/SideMenu";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";

const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <div className="sideBarMenu">
        <SideBarMenu currentPage='/dashboard' />
      </div>

      <div className="WIP">
        <RevenueGraph />
        <CustomerGraph />
      </div>
    </div>
  );
};

export default Dashboard;
