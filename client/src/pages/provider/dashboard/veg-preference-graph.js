import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import supabase from '../../../supabase'; // Import your configured Supabase client
import { provider_id } from "../../../util/localStorage.js"; // Import provider_id from localStorage

const chartSetting = {
  width: 400,
  height: 200,
};

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
    <PieChart
      series={[
        {
          data: dataset,
        },
      ]}
      width={400}
      height={200}
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
