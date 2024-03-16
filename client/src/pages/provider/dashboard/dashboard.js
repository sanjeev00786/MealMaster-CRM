import React from "react";
import "./dashboard.css";
import RevenueGraph from "./revenue-graph";
import CustomerGraph from "./new-customers-graph";
import VegPieChart from "./veg-preference-graph";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";

const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/dashboard" />
      </div>

      <div className="WIPContainer">
        <div className="WIP">
          <RevenueGraph />
          <CustomerGraph />
        </div>
        <div className="WIP">
          <VegPieChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
