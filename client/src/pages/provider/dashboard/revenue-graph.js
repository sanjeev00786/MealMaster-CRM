import React, { useEffect, useState } from "react";
import supabase from '../../../supabase';
import { BarChart, axisClasses } from "@mui/x-charts";
import { provider_id } from "../../../util/localStorage";
import { Select, MenuItem } from "@mui/material";
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

export default function BarChartWithDropdown() {
  const [year, setYear] = useState(2023); // Default year
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        console.log(`Fetching revenue data for ${year}...`);

        let { data, error } = await supabase
          .from("provider_analytics")
          .select("calculation_month, total_revenue")
          .eq("calculation_year", year)
          .eq("provider_id", provider_id)
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
  }, [year]);

  console.log("Current state of revenueData:", revenueData);

  if (revenueData === null) {
    console.log("Revenue data is null, rendering loading...");
    return <div>Loading...</div>;
  }

  console.log("Rendering BarChart with revenue data:", revenueData);

  // Sort data by month
  const sortedData = revenueData.sort((a, b) => sortMonths(a.calculation_month, b.calculation_month));

  // Create an object to store revenue data for each month
  const revenueByMonth = {};
  sortedData.forEach((entry) => {
    revenueByMonth[entry.calculation_month] = entry.total_revenue;
  });

  // Fill in missing months with zero revenue
  const filledData = [];
  const monthsOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  monthsOrder.forEach(month => {
    filledData.push({
      calculation_month: month,
      total_revenue: revenueByMonth[month] || 0
    });
  });

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const customBarSlot = (props) => {
    const radius = 7;
    const { x, y, height, width, ownerState, ...restProps } = props;
    const d = `M${x},${y} h${width - radius
      }a${radius},${radius} 0 0 1 ${radius},${radius} v${height - 2 * radius
      } a${radius},${radius} 0 0 1 ${-radius},${radius} h${radius - width
      }z`;
    return <path d={d} fill={ownerState.color} {...restProps} />;
  };

  return (
    <div>
      <h2>Revenue</h2>
      {/* <Select value={year} onChange={handleYearChange} sx={{ m: 1, minWidth: 120 }} size="small">
        <MenuItem value={2021}>2021</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2024}>2024</MenuItem>
      </Select> */}
      <BarChart
        dataset={filledData}
        xAxis={[{ scaleType: "band", dataKey: "calculation_month" }]}
        series={[{ dataKey: "total_revenue" }]}
        layout="vertical"
        {...chartSetting}
      />
    </div>
  );
}
