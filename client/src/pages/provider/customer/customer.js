import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import tickmark from "../../../component-assets/tickmark.svg";
import unpaidSign from "../../../component-assets/unpaidSign.svg";
import editicon from "../../../component-assets/editicon.svg";
import ViewCustomerDetailsModal from "./ViewCustomerDetailsModal";
import Header from "../../../components/header/header";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import Loader from "../../../components/Loader/Loader";
import Button from "@mui/material/Button";
import ConfirmationModal from "./ConfirmationModal"; 
import "./customerPage.css";

const customerUrl =
  "http://localhost:3001/api/customer/provider/get-all-customers/5de05e6c-162f-4293-88d5-2aa6bd1bb8a3?page=2";

const mealPlanUrl =
  "http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3";

export default function CustomerPage() {
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [planName, setPlanName] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 400);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState(null);
  const [isPaidToUpdate, setIsPaidToUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(customerUrl);
        const mealPlan = await axios.get(mealPlanUrl);
        setRecords(res.data.data.customers);
        setFilteredData(res.data.data.customers);
        setPlanName(mealPlan.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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

  const handlePaymentClick = (customerId, isPaid) => {
    setCustomerIdToUpdate(customerId);
    setIsPaidToUpdate(isPaid);
    setConfirmationModalOpen(true);
  };

  const handleConfirmation = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/customer/edit-customer/${customerIdToUpdate}`,
        {
          payment: isPaidToUpdate,
        }
      );

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.customer_id === customerIdToUpdate
            ? { ...record, payment: isPaidToUpdate }
            : record
        )
      );

      console.log(
        `Customer ID: ${customerIdToUpdate} marked as ${
          isPaidToUpdate ? "Paid" : "Unpaid"
        }`
      );

      setConfirmationModalOpen(false);
    } catch (error) {
      console.error("Error updating customer status:", error);
    }
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  const columns = [
    {
      name: "Customer's Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Plan",
      selector: (row) => getPlanName(row.plan_id) || "N/A",
      omit: isSmallScreen,
      grow: 1.5,
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
      omit: isSmallScreen,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div onClick={() => setSelectedCustomerId(row.customer_id)}>
            View Details
          </div>
          <div onClick={() => navigate("/customers")}>
            <img src={editicon} alt="EditIcon" />
          </div>
        </>
      ),
    },
  ];

  const customStyles = {
    table: {
      width: "100%",
    },
  };

  const handleFilter = (event) => {
    const newData = filteredData.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };


  return (
    <div className="customer-page-container">
      {/* <div className="mobileSideMenu">
        <AnchorTemporaryDrawer />
      </div> */}
      <div className="sideMenu">
        {/* <MiniDrawer /> */}
      </div>
      {/* <Loader loading={loading} /> */}

      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirmation}
        message={`Are you sure you want to mark this customer as ${
          isPaidToUpdate ? "Paid" : "Unpaid"
        }?`}
      />

      <div className="customer-page">
      <div className="page-heading">
          <h1 className=" underline">Customers</h1>
        </div>
      <div
        className="search-addButtton-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={handleFilter}
            className="search-input"
          />
        </div>
      <div>
        <Button variant="contained" onClick={() => navigate("/customers")}>Add New Customer</Button>
      </div>
      </div>

      <div className="data-table-parent-container">
      <h2> List of Customers</h2>
      <div className="data-table-container">
        
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
      </div>
      </div>
    </div>
  );
}
