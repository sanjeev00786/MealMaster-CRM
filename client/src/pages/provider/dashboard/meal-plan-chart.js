import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import supabase from '../../../supabase'; 
import { provider_id } from "../../../util/localStorage.js"; 
import "../../CSS/variable.css"


const chartSetting = {
  width: 500,
  height: 300,
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
    <div className='meal-plan-chart-container'>
      <h2>Preferred Plans</h2>
      <PieChart
        margin={{ top: 10, bottom: 80, left: 10, right: 10 }}
        colors={['#8C7AE1', '#411B72', '#691C78', '#1C1C1C', '#083223', '#771F1F']}
        series={[
          {
            data: dataset,
            innerRadius: 60,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 360,
          },
        ]}
        width={chartSetting.width}
        height={chartSetting.height}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
          },
        }}
      />
    </div>
  );
}
