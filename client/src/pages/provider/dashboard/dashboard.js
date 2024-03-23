import React from "react";
import "./dashboard.css";
import RevenueGraph from "./revenue-graph";
import CustomerGraph from "./new-customers-graph";
import VegPieChart from "./veg-preference-graph";
import MealPlanPieChart from "./meal-plan-chart";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3} className="sideBarMenu">
          <SideBarMenu currentPage="/dashboard" />
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {/* Revenue Graph */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} className="graphPaper">
                <RevenueGraph />
              </Paper>
            </Grid>

            {/* Veg Pie Chart */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} className="graphPaper">
                <VegPieChart />
              </Paper>
            </Grid>

            {/* Customer Graph */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} className="graphPaper">
                <CustomerGraph />
              </Paper>
            </Grid>

            {/* Meal Plan Pie Chart */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} className="graphPaper">
                <MealPlanPieChart />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

