import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import supabase from '../../../supabase'; // Import your configured Supabase client
import { provider_id } from "../../../util/localStorage.js"; // Import provider_id from localStorage

const chartSetting = {
  width: 500,
  height: 200,
};

export default function MealPlanPieChart() {
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanData() {
      console.log("Fetching meal plan data...");
      try {
        const { data, error } = await supabase
          .from('meal_plan_analytics')
          .select('plan_name, customers_count_per_plan')
          .eq('provider_id', provider_id) // Use provider_id from localStorage
          .order('created_at', { ascending: false })

        if (error) {
          throw error;
        }

        console.log("Fetched meal plan data:", data);
        setPlanData(data.filter(entry => entry.customers_count_per_plan > 0));
      } catch (error) {
        console.error('Error fetching plan data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanData();
  }, []);

  console.log("MealPlanPieChart rendering...");

  if (loading) {
    return <div>Loading...</div>;
  }

  const dataset = planData.slice(0, 4).map((entry, index) => ({
    id: index,
    value: entry.customers_count_per_plan,
    label: entry.plan_name,
  }));

  console.log("Dataset:", dataset);

  return (
    <PieChart
      series={[
        {
          data: dataset,
        },
      ]}
      width={chartSetting.width}
      height={chartSetting.height}
      slotProps={{
        legend: {
            direction: 'column',
            position: { vertical: 'middle', horizontal: 'right' },
            padding: 0,
        },
      }}
    />
  );
}
