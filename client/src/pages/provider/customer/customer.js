import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import tickmark from "../../../component-assets/tickmark.svg";
import unpaidSign from "../../../component-assets/unpaidSign.svg";
import editicon from "../../../component-assets/editicon.svg";
import ViewCustomerDetailsModal from "./ViewCustomerDetailsModal";


const customerUrl =
  "http://localhost:3001/api/customer/provider/get-all-customers/5de05e6c-162f-4293-88d5-2aa6bd1bb8a3";

const mealPlanUrl =
  "http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3";

export default function CustomerPage() {
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [planName, setPlanName] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 400);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(customerUrl);
        const mealPlan = await axios.get(mealPlanUrl);
        setRecords(res.data.data.customers);
        setFilteredData(res.data.data.customers);
        setPlanName(mealPlan.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [customerUrl]);

  function getPlanName(planId) {
    const matchedPlan = planName.find((plan) => plan.plan_id === planId);
    return matchedPlan ? matchedPlan.plan_name : "N/A";
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 393);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePaymentClick = async (customerId, isPaid) => {
    try {
      // Make PUT request to update customer status
      await axios.put(
        `http://localhost:3001/api/customer/edit-customer/${customerId}`,
        {
          payment: isPaid,
        }
      );

      // Update the local state with the new payment status
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.customer_id === customerId
            ? { ...record, payment: isPaid }
            : record
        )
      );

      console.log(
        `Customer ID: ${customerId} marked as ${isPaid ? "Paid" : "Unpaid"}`
      );
    } catch (error) {
      console.error("Error updating customer status:", error);
    }
  };

  const columns = [
    {
      name: "Customer's Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      width: "150px",
    },
    {
      name: "Plan",
      selector: (row) => getPlanName(row.plan_id) || "N/A",
      omit: isSmallScreen,
      width: "150px",
    },
    {
      name: "Quantity",
      selector: (row) => row.tiffin_quantity,
      omit: isSmallScreen,
    },
    {
      name: "Billing Date",
      selector: (row) => row.billing_cycle,
      omit: isSmallScreen,
      width: "150px",
    },
    {
      name: "Last Bill Payment",
      selector: (row) => (
        <div onClick={() => handlePaymentClick(row.customer_id, !row.payment)}>
          {row.payment ? (
            <>
              <img src={tickmark} alt="Paid" />
              <span> Paid </span>
            </>
          ) : (
            <>
              <img src={unpaidSign} alt="Unpaid" />
              <span> Unpaid </span>
            </>
          )}
        </div>
      ),
      width: "150px",
      omit: isSmallScreen,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link onClick={() => setSelectedCustomerId(row.customer_id)}>
            View Details{" "}
          </Link>
          <Link onClick={() => setSelectedCustomerId(row.customer_id)}>
            <img src={editicon} alt="EditIcon" />
          </Link>
        </>
      ),
      width: "100px",
    },
  ];

  const customStyles = {
    table: {
      width: "100%",
    },
  };

  console.log(filteredData)

  const handleFilter = (event) => {
    const newData = filteredData.filter(row =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  return (
    <div className="customer-page-container" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "right"}}>
            <input type="text" placeholder="Search...." onChange={handleFilter} style={{ padding: '5px 2px 5px 10px'}} /> 
            </div>
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
      />

      <ViewCustomerDetailsModal
        customerId={selectedCustomerId}
        onClose={() => setSelectedCustomerId(null)}
      />
    </div>
  );
}
