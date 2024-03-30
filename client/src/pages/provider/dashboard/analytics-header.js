import React from "react";
import { Grid } from "@mui/material";
import AnalyticsCard from './analytics-card'; // Import the AnalyticsCard component

const AnalyticsHeader = () => {
  return (
    <Grid container direction="row" spacing={2} mt={1}>
      {/* Revenue Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Revenue"
          value="$12840"
          percentage="5"
          isRising={true}
        />
      </Grid>

      {/* Total Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Total Subscriptions"
          value="523"
          percentage="2"
          isRising={true}
        />
      </Grid>

      {/* New Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="New Subscriptions"
          value="54"
          percentage="10"
          isRising={true}
        />
      </Grid>

      {/* Drivers Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Drivers"
          value="6"
          percentage="8"
          isRising={false}
        />
      </Grid>
    </Grid>
  );
};

export default AnalyticsHeader;
