import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import tickmark from "../../../component-assets/tickmark.svg";
import unpaidSign from "../../../component-assets/unpaidSign.svg";
import editicon from "../../../component-assets/editicon.svg";
import ViewCustomerDetailsModal from "./ViewCustomerDetailsModal";
import Pagination from "@mui/material/Pagination";
import Header from "../../../components/header/header";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import Loader from "../../../components/Loader/Loader";
import Button from "@mui/material/Button";
import ConfirmationModal from "./ConfirmationModal";
import "../../CSS/variable.css"

import "./customerPage.css";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { provider_id } from "../../../util/localStorage.js";
import { Link } from "react-router-dom";

const mealPlanUrl = `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`;

export default function CustomerPage() {
  const { page } = useParams();
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [planName, setPlanName] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState(null);
  const [isPaidToUpdate, setIsPaidToUpdate] = useState(null);
  const [allRecords, setAllRecords] = useState({});
  const [currentFilter, setCurrentFilter] = useState("all");
  const [statusResult, setStatusResult] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = async (pageNum, filter) => {
    setLoading(true);
    try {
      const customerUrl = `${ENDPOINTS.GET_ALL_CUSTOMER}${provider_id}?page=${pageNum}`;
      const customerStatusUrl = `${ENDPOINTS.GET_CUSTOMER_BY_STATUS}${provider_id}?page=${pageNum}&status=${filter}`;
      const allCustomerURL = `${ENDPOINTS.GET_ALLIST_CUSTOMER}${provider_id}`;

      const res = await apiHelper.get(customerStatusUrl);

      // const response = apiHelper.get(customerStatusUrl)

      const allCustomer = await apiHelper.get(allCustomerURL);

      const mealPlan = await apiHelper.get(mealPlanUrl);

      // setStatusResult(response.data.customers)
      setRecords(res.data.customers);
      setAllRecords(allCustomer.data.customers);
      setFilteredData(res.data.customers);
      setTotalPages(res.data.totalPages);
      setPlanName(mealPlan.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(page, currentFilter);
  }, [page, currentFilter]);

  const handlePageChange = (event, newPage) => {
    navigate(`/customerList/${newPage}`);
  };

  function getPlanName(planId) {
    const matchedPlan = planName.find((plan) => plan.plan_id === planId);
    return matchedPlan ? matchedPlan.plan_name : "N/A";
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePaymentClick = (customerId, isPaid) => {
    console.log(customerId);
    setCustomerIdToUpdate(customerId);
    setIsPaidToUpdate(isPaid);

    setConfirmationModalOpen(true);
  };

  const handleConfirmation = async () => {
    try {
      await apiHelper.put(`${ENDPOINTS.EDIT_CUSTOMER}${customerIdToUpdate}`, {
        payment: isPaidToUpdate,
      });

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.customer_id === customerIdToUpdate
            ? { ...record, payment: isPaidToUpdate }
            : record
        )
      );

      fetchData(page, currentFilter);

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

  const handleDisableCustomer = async (customerId) => {
    try {
      await apiHelper.put(`${ENDPOINTS.EDIT_CUSTOMER}${customerId}`, {
        status: false,
        payment: false,
      });

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.customer_id === customerId
            ? { ...record, status: false }
            : record
        )
      );
      fetchData(page, currentFilter);
      setSelectedCustomerId(null);
      console.log(`Customer with ID ${customerId.name} Disabled successfully.`);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const columns = [
    {
      name: isSmallScreen ? "Name" : "Customer Name",
      selector: (row) => row.name,
      sortable: true,
      grow: isSmallScreen ? 1.5 : 1,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      omit: isSmallScreen,
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
      name: "Start Date",
      selector: (row) => row.billing_cycle,
      omit: isSmallScreen,
    },
    {
      name: isSmallScreen ? "Payment": "Current Payment",
      selector: (row) => (
        // <Link onClick={() => handlePaymentClick(row.customer_id, !row.payment)}>
          row.payment ? (
            <>
              <img className="paidSign" src={tickmark} alt="Paid" />
              <span> Paid </span>
            </>
          ) : (
            <>
              <img className="paidSign" src={unpaidSign} alt="Unpaid" />
              <span className="Unpaid"> Unpaid </span>
            </>
          )
        // </Link>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link onClick={() => setSelectedCustomerId(row.customer_id)}>
            View Details
          </Link>
        </>
      ),
    },
  ];


  // const handleFilterButtonClick = (filter) => {
  //   if (filter) {
  //     setCurrentFilter(filter);
  //   } else {
  //     setCurrentFilter("all");
  //   }
  //   // const newData = filterDataByStatus(filter, statusResult);
  //   // setRecords(newData);
  // };

  const handleFilter = (event) => {
    const newData = allRecords.filter(
      (row) =>
        row.name.toLowerCase().includes(event.target.value.toLowerCase()) &&
        ((currentFilter === "active" && row.status) ||
          (currentFilter === "inactive" && !row.status) ||
          currentFilter === "all")
    );
    setRecords(newData);
  };

  const handleChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  // const filterDataByStatus = (status, data) => {
  //   console.log(status, data);
  //   if (status === "active") {
  //     return data.filter((row) => row.status);
  //   } else if (status === "inactive") {
  //     return data.filter((row) => !row.status);
  //   } else {
  //     return data;
  //   }
  // };

  return (
    <div className="customer-page-container">
      
      <div className="mobileSideBarMenu">
        <AnchorTemporaryDrawer />
      </div>
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/customerList/1" />
      </div>
      <Loader loading={loading} />

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
          <h1 className="underline">Customers</h1>
        </div>

        {/* <div className="filter-buttons-container">
          <Button
            variant="outlined"
            className={`filterButtons ${
              currentFilter === "all" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("all")}
            disabled={currentFilter === "all"}
          >
            All
          </Button>
          <Button
            variant="outlined"
            className={`filterButtons ${
              currentFilter === "active" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("active")}
            disabled={currentFilter === "active"}
          >
            Active
          </Button>
          <Button
            variant="outlined"
            className={`filterButtons ${
              currentFilter === "inactive" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("inactive")}
            disabled={currentFilter === "inactive"}
          >
            Inactive
          </Button>
        </div> */}

        <div className="filter-tabs-container">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={currentFilter}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="customer status tabs"
            >
              <Tab value="all" label="All" />
              <Tab value="active" label="Active" />
              <Tab value="inactive" label="Inactive" />
            </Tabs>
          </Box>
        </div>

        <div
          className="search-addButtton-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Name"
              onChange={handleFilter}
              className="search-input"
            />
          </div>
          <div className="add-customer-button">
            <Button variant="contained" onClick={() => navigate("/customers")}>
              Add New Customer
            </Button>
          </div>
        </div>

        <div className="data-table-parent-container">
          <h2> List of Customers</h2>
          <div className="data-table-container">
            <DataTable columns={columns} data={records} />
            <ViewCustomerDetailsModal
              customerId={selectedCustomerId}
              onDelete={handleDisableCustomer}
              onClose={() => setSelectedCustomerId(null)}
            />
          </div>

          <div className="pagination-container">
            <Pagination count={totalPages} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
