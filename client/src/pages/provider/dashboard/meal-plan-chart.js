import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import supabase from '../../../supabase'; 
import { provider_id } from "../../../util/localStorage.js"; 

// Define color constants
const primaryColor = '#6F59DA';
const secondaryColor = '#24024F';
const tertiaryColor = '#E8CFFC';
const textColor = '#17181A';
const graphTextColor = '#ffffff'

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
    id: entry.plan_name,
    label: entry.plan_name,
    value: entry.customers_count_per_plan,
  }));

  console.log("Dataset:", dataset);

  return (
    <div className='meal-plan-chart-container'>
      <h2 style={{ color: textColor }}>Preferred Plans</h2>
      <div style={{ width: chartSetting.width, height: chartSetting.height }}>
        <ResponsivePie
          data={dataset}
           margin={{ top: 20, right: 30, bottom: 100, left: 30 }}
          innerRadius={0.5}
          padAngle={7}
          cornerRadius={3}
          colors={[primaryColor, secondaryColor, tertiaryColor]}
          borderWidth={5}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor={graphTextColor}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor={textColor}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: textColor,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
