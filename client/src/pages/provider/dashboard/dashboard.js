import React from "react";
import "../../CSS/variable.css";
import "../../CSS/variable.css";

import "./dashboard.css";
import RevenueGraph from "./revenue-graph";
import CustomerGraph from "./new-customers-graph";
import VegPieChart from "./veg-preference-graph";
import MealPlanPieChart from "./meal-plan-chart";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AnalyticsHeader from "./analytics-header"
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";

// Import CustomerMap component
import CustomerMap from "./customer-cluster-map"; 

const Dashboard = () => {
  return (
    <div className="dashboard-page-container">
      {/* Content */}
      
        {/* Sidebar */}
        <div className="mobileSideBarMenu">
          <AnchorTemporaryDrawer />
        </div>
        <div className="sideBarMenu">
          <SideBarMenu currentPage="/dashboard" />
        </div>

        <div></div>
        {/* Content */}
        <div></div>
        <Grid
        className="graph-container"
        item
        xs={12}
        md={9}
        style={{  maxHeight: "calc(100vh)" }}
        paddingRight={2}
      >
        <h1 className="dashboardHeading">Dashboard</h1>
        <AnalyticsHeader />
        <Grid container spacing={2}>
          {/* Revenue Graph */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} className="graphPaper">
              <RevenueGraph  />
            </Paper>
          </Grid>

          {/* Veg Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} className="graphPaper">
              <CustomerGraph />
            </Paper>
          </Grid>

          {/* Customer Graph */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} className="graphPaper">
              <VegPieChart />
            </Paper>
          </Grid>

          {/* Meal Plan Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} className="graphPaper">
              <MealPlanPieChart />
            </Paper>
          </Grid>

          {/* Customer Map */}
          <Grid item xs={12} md={12} mb={2}>
            <Paper elevation={0} className="graphPaper">
              <CustomerMap />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
