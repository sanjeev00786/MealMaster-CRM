import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const RevenueGraph = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await axios.get(
          'http://localhost:3001/api/customer/provider/get-all-customers/5de05e6c-162f-4293-88d5-2aa6bd1bb8a3'
        );
        const customers = customerResponse.data.data.customers;

        // Fetch meal plan data
        const mealPlanResponse = await axios.get(
          'http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3'
        );
        const mealPlans = mealPlanResponse.data.data;

        // Process data to calculate revenue per month
        const monthlyRevenue = customers.reduce((acc, customer) => {
          const billingMonth = new Date(customer.billing_cycle).toLocaleString('en-US', { month: 'long', year: 'numeric' });
          const mealPlan = mealPlans.find((plan) => plan.plan_id === customer.plan_id);

          if (mealPlan && new Date(mealPlan.created_at) <= new Date(customer.billing_cycle)) {
            const revenue = acc[billingMonth] || 0;
            acc[billingMonth] = revenue + parseFloat(mealPlan.price);
          }

          return acc;
        }, {});

        // Prepare data for chart
        const chartData = Object.entries(monthlyRevenue).map(([month, value]) => ({
          month,
          revenue: value,
        }));

        setRevenueData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Monthly Revenue</h2>
      <div style={{ width: '80%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGraph;
