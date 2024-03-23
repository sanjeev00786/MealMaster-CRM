import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const AnalyticsHeader = () => {
  return (
    <Grid container direction="row" spacing={2} mt={1}>
      {/* Revenue Card */}
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="body1">$10,000</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Subscriptions</Typography>
            <Typography variant="body1">500</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* New Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">New Subscriptions</Typography>
            <Typography variant="body1">50</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Drivers Card */}
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Drivers</Typography>
            <Typography variant="body1">10</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsHeader;
