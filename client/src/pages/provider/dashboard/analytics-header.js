import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AnalyticsCard from './analytics-card'; // Import the AnalyticsCard component
import supabase from '../../../supabase'; // Import the Supabase client
import { getProviderIdFromLocalStorage } from "../../../util/localStorage";

const AnalyticsHeader = () => {
  const [revenue, setRevenue] = useState("$0");
  const [totalSubscriptions, setTotalSubscriptions] = useState("0");
  const [newSubscriptions, setNewSubscriptions] = useState("0");
  const [revenuePercentage, setRevenuePercentage] = useState("NaN");
  const [totalSubsPercentage, setTotalSubsPercentage] = useState("NaN");
  const [revenueIsRising, setRevenueIsRising] = useState(false);
  const [newSubsIsRising, setNewSubsIsRising] = useState(false);
  const [driversCount, setDriversCount] = useState("0");
  const [driversIsRising, setDriversIsRising] = useState(false);
  const id = getProviderIdFromLocalStorage()

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch revenue
        const { data: revenueData, error: revenueError } = await supabase
          .from("provider_analytics")
          .select("total_revenue")
          .eq("provider_id", id)
          .order("created_at", { ascending: false })
          .limit(2);

        if (revenueError) {
          throw revenueError;
        }

        if (revenueData && revenueData.length >= 2) {
          const latestRevenue = revenueData[0].total_revenue;
          const prevRevenue = revenueData[1].total_revenue;
          const revenueChange = latestRevenue - prevRevenue;
          const revenueChangePercentage = ((revenueChange / prevRevenue) * 100).toFixed(2);
          setRevenue(`$${latestRevenue}`);
          setRevenuePercentage(`${revenueChangePercentage}`);
          setRevenueIsRising(revenueChange > 0);
        } else {
          setRevenue("$0");
          setRevenuePercentage("NaN");
          setRevenueIsRising(false);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error.message);
        setRevenue("$0");
        setRevenuePercentage("NaN");
        setRevenueIsRising(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch total subscriptions
        const { data: subsData, error: subsError } = await supabase
          .from("provider_analytics")
          .select("total_customers")
          .eq("provider_id", id)
          .order("created_at", { ascending: false })
          .limit(2);

        if (subsError) {
          throw subsError;
        }

        if (subsData && subsData.length >= 2) {
          const latestSubs = subsData[0].total_customers;
          const prevSubs = subsData[1].total_customers;
          const newSubsCount = latestSubs - prevSubs;
          setTotalSubscriptions(`${latestSubs}`);
          setNewSubscriptions(`${newSubsCount}`);
          const subsChangePercentage = ((newSubsCount / prevSubs) * 100).toFixed(2);
          setTotalSubsPercentage(`${subsChangePercentage}`);
          setNewSubsIsRising(newSubsCount > 0);
        } else {
          setTotalSubscriptions("0");
          setTotalSubsPercentage("NaN");
          setNewSubsIsRising(false);
        }
      } catch (error) {
        console.error('Error fetching total subscriptions data:', error.message);
        setTotalSubscriptions("0");
        setTotalSubsPercentage("NaN");
        setNewSubsIsRising(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch number of drivers
        const { count, error: driversError } = await supabase
        .from("drivers")
        .select("*", { count: "exact", head: true })
        .eq("provider_id", id);

        if (driversError) {
          throw driversError;
        }

        if (count) {
          setDriversCount(count.toString());
          setDriversIsRising(true); // Assuming more drivers is considered "rising"
        } else {
          setDriversCount("0");
          setDriversIsRising(false);
        }
      } catch (error) {
        console.error('Error fetching drivers count:', error.message);
        setDriversCount("0");
        setDriversIsRising(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Grid container direction="row" spacing={2} mt={1}>
      {/* Revenue Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Revenue"
          value={revenue}
          percentage={revenuePercentage}
          isRising={revenueIsRising}
        />
      </Grid>

      {/* Total Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Total Subscriptions"
          value={totalSubscriptions}
          percentage={totalSubsPercentage}
          isRising={true}
        />
      </Grid>

      {/* New Subscriptions Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="New Subscriptions"
          value={newSubscriptions}
          isRising={newSubsIsRising}
          showPercentageAndIcon={false}
        />
      </Grid>

      {/* Drivers Card */}
      <Grid item xs={12} sm={3}>
        <AnalyticsCard
          title="Drivers"
          value={driversCount}
          isRising={driversIsRising}
          showPercentageAndIcon={false}
        />
      </Grid>
    </Grid>
  );
};

export default AnalyticsHeader;



