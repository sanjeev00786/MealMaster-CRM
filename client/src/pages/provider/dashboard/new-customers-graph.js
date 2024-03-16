import React, { useEffect, useState } from "react";
import supabase from '../../../supabase'; // assuming you have configured Supabase client
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, axisClasses } from "@mui/x-charts";
import { provider_id } from "../../../util/localStorage";

const chartSetting = {
  yAxis: [
    {
      label: "Number of Customers",
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

export default function BarsDataset() {
  const [customerData, setCustomerData] = useState(null); // Initialize with null

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        console.log("Fetching customer data for 2023...");
        
        let { data, error } = await supabase
          .from("provider_analytics")
          .select("calculation_month, total_customers")
          .eq("calculation_year", 2023)
          .eq("provider_id", provider_id) // Provider ID for Nandu Tiffin Hub
          .order("calculation_month");

        console.log("Data fetched:", data);
        console.log("Error:", error);
        if (error) {
          console.error("Error fetching customer data:", error.message);
          throw error;
        }
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
      }
    }

    fetchCustomerData();
  }, []);

  console.log("Current state of customerData:", customerData);

  if (customerData === null) {
    console.log("Customer data is null, rendering loading...");
    return <div>Loading...</div>; // Add a loading indicator while data is being fetched
  }

  console.log("Rendering BarChart with customer data:", customerData);
  const dataset = customerData.map((entry) => ({
    month: entry.calculation_month,
    customers: entry.total_customers,
  }));

  return (
    <div className="customer-graph">
      <LineChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[{ dataKey: "customers", label: "Number of Customers" }]}
        {...chartSetting}
      />
    </div>
  );
}
