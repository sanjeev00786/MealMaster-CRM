import React, { useState, useEffect } from "react";
import CustomerForm from "./CustomerPage1";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function EditCustomerForm() {
    const { customerId } = useParams();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      // Fetch customer data using the customerId
      try {
        const response = await axios.get(
          `http://localhost:3001/api/customer/get-customer/${customerId}`
        );
        setCustomerData(response.data.data.data);
        console.log(response.data.data.data)
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  return (
    <React.Fragment>
      {customerData && <CustomerForm customerData={customerData} />}
    </React.Fragment>
  );
}
