import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { ENDPOINTS } from '../../../apiConfig.js';

import apiHelper from '../../../util/ApiHelper/ApiHelper.js';
import { provider_id } from "../../../util/localStorage.js";

const RevenueGraph = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await apiHelper.get(
          `${ENDPOINTS.GET_ALL_CUSTOMER}${provider_id}`
        );

        const customers = customerResponse.data.customers;

        // Fetch meal plan data
        const mealPlanResponse = await apiHelper.get(
          `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`
        );
        const mealPlans = mealPlanResponse.data;

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
