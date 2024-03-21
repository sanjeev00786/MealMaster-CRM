import React, { useState, useEffect } from "react";
import CustomerForm from "./CustomerPage1";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";

export default function EditCustomerForm() {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_CUSTOMER}${customerId}`
        );
        setCustomerData(response.data.data);
        console.log(response.data.data);
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
