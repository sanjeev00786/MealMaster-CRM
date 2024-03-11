import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { ENDPOINTS } from '../../../apiConfig.js';

import apiHelper from '../../../util/ApiHelper/ApiHelper.js';
import { provider_id } from "../../../util/localStorage.js";

const CustomerGraph = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await apiHelper.get(
          `${ENDPOINTS.GET_ALL_CUSTOMER}${provider_id}`
        );
        const customers = customerResponse.data.customers;

        // Process data to count new customers per month
        const monthlyCustomers = customers.reduce((acc, customer) => {
          const billingMonth = new Date(customer.billing_cycle).toLocaleString('en-US', { month: 'long', year: 'numeric' });

          if (!acc[billingMonth]) {
            acc[billingMonth] = 1;
          } else {
            acc[billingMonth]++;
          }

          return acc;
        }, {});

        // Prepare data for chart
        const chartData = Object.entries(monthlyCustomers).map(([month, value]) => ({
          month,
          customers: value,
        }));

        setCustomerData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>New Customers per Month</h2>
      <div style={{ width: '80%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={customerData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="customers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerGraph;
