import React, { useEffect, useState } from "react";
import supabase from '../../../supabase'; // assuming you have configured Supabase client
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "Revenue (in millions)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value) => `$${value}M`;

export default function BarsDataset() {
  const [revenueData, setRevenueData] = useState(null); // Initialize with null

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        console.log("Fetching revenue data for 2023...");
        
        let { data, error } = await supabase
          .from("provider_analytics")
          .select("calculation_month, total_revenue")
          .eq("calculation_year", 2023)
          .eq("provider_id", "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3") // Provider ID for Nandu Tiffin Hub
          .order("calculation_month");

        console.log("Data fetched:", data);
        console.log("Error:", error);
        if (error) {
          console.error("Error fetching revenue data:", error.message);
          throw error;
        }
        setRevenueData(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error.message);
      }
    }

    fetchRevenueData();
  }, []);

  console.log("Current state of revenueData:", revenueData);

  if (revenueData === null) {
    console.log("Revenue data is null, rendering loading...");
    return <div>Loading...</div>; // Add a loading indicator while data is being fetched
  }

  console.log("Rendering BarChart with revenue data:", revenueData);
  const dataset = revenueData.map((entry) => ({
    month: entry.calculation_month,
    revenue: entry.total_revenue,
  }));

  return (
    <div className="revenue-graph">
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "revenue", label: "Revenue", valueFormatter }]}
      {...chartSetting}
    />
    </div>
  );
}
