import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import supabase from '../../../supabase'; // Import your configured Supabase client
import { provider_id } from "../../../util/localStorage.js"; // Import provider_id from localStorage
import "../../CSS/variable.css"
import './graph.css'

export default function VegPieChart() {
  const [vegCustomers, setVegCustomers] = useState(0);
  const [nonVegCustomers, setNonVegCustomers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const { data, error } = await supabase
          .from('provider_analytics')
          .select('veg_customers, total_customers')
          .eq('provider_id', provider_id) // Use provider_id from localStorage
          .order('calculation_month', { ascending: false })
          .limit(1);

        if (error) {
          throw error;
        }

        const latestEntry = data[0];
        if (latestEntry) {
          setVegCustomers(latestEntry.veg_customers);
          setNonVegCustomers(latestEntry.total_customers - latestEntry.veg_customers);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const dataset = [
    { id: 0, value: vegCustomers, label: 'Vegetarian' },
    { id: 1, value: nonVegCustomers, label: 'Non-Vegetarian' },
  ];

  return (
    <div className='veg-container'>
      <h2>Dietary Preferences</h2>
      <PieChart
        margin={{ top: 10, bottom: 80, left: 10, right: 10 }}
        colors={['#24024F', '#6F59DA', '#C686F8']}
        series={[
          {
            data: dataset,
            innerRadius: 80,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 360,
          },
        ]}
        width={500}
        height={300}
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