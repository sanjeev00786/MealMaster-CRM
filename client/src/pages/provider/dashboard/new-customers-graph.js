import React, { useEffect, useState } from "react";
import supabase from '../../../supabase';
import { LineChart, axisClasses } from "@mui/x-charts";
import { provider_id } from "../../../util/localStorage";
import { Select, MenuItem } from "@mui/material";
import "../../CSS/variable.css"

import './graph.css'
const chartSetting = {
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

// Function to sort months in chronological order
const sortMonths = (a, b) => {
  const monthsOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthsOrder.indexOf(a) - monthsOrder.indexOf(b);
};

export default function LineChartWithDropdown() {
  const [year, setYear] = useState(2023); // Default year
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        console.log(`Fetching customer data for ${year}...`);
        
        let { data, error } = await supabase
          .from("provider_analytics")
          .select("calculation_month, total_customers")
          .eq("calculation_year", year)
          .eq("provider_id", provider_id)
          .order("calculation_month"); // Sort by calculation_month

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
  }, [year]);

  console.log("Current state of customerData:", customerData);

  if (customerData === null) {
    console.log("Customer data is null, rendering loading...");
    return <div>Loading...</div>;
  }

  console.log("Rendering LineChart with customer data:", customerData);
  
  // Sort data by month
  const sortedData = customerData.sort((a, b) => sortMonths(a.calculation_month, b.calculation_month));

  // Create an object to store customer data for each month
  const customersByMonth = {};
  sortedData.forEach((entry) => {
    customersByMonth[entry.calculation_month] = entry.total_customers;
  });

  // Fill in missing months with zero customers
  const filledData = [];
  const monthsOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  monthsOrder.forEach(month => {
    filledData.push({
      calculation_month: month,
      total_customers: customersByMonth[month] || 0
    });
  });

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <h2>Subscriber Growth</h2>
      {/* <Select value={year} onChange={handleYearChange} sx={{ m: 1, minWidth: 120 }} size="small">
        <MenuItem value={2021}>2021</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2024}>2024</MenuItem>
      </Select> */}
      <LineChart
        dataset={filledData}
        xAxis={[{ scaleType: "band", dataKey: "calculation_month" }]}
        series={[{ dataKey: "total_customers", area: true,}]}
        {...chartSetting}
      />
    </div>
  );
}

