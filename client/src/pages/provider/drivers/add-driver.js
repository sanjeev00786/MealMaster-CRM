import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "./driver-details-modal";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import Loader from "../../../components/Loader/Loader";
import CustomizedSnackbar from "../../../components/Notification/Notification";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import editicon from "../../../component-assets/editicon.svg";
import { ENDPOINTS } from "../../../apiConfig.js";
import { provider_id } from "../../../util/localStorage.js";

import "./add-driver.css";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";

export default function DriverPage() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const navigate = useNavigate();

  const columns = [
    {
      name: "Driver's Name",
      selector: (row) => row.name,
      sortable: true,
      width: "175px",
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact,
      width: "auto",
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div
            onClick={() => {
              const selectedDriver = {
                driver_id: row.driver_id,
                login_token: row.login_token,
              };
              setSelectedDriverId(selectedDriver);
            }}
          >
            <a href="#">View Details</a>
          </div>
          <div onClick={() => navigate("/drivers")}></div>
        </>
      ),
    },
  ];

  console.log(selectedDriverId);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_ALL_DRIVER}provider_id=${provider_id}`
        );
        setRecords(response.data);
        console.log(response.data);
        setFilteredRecords(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("selectedDriverId:", selectedDriverId);
  }, [selectedDriverId]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const newData = records.filter((row) =>
      row.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRecords(newData);
  };

  return (
    <div className="driver-page-container">
      <CustomizedSnackbar />
      {/* <div className="mobileSideBarMenu">
        <AnchorTemporaryDrawer />
      </div> */}
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/drivers" />
      </div>
      <Loader loading={loading} />
      <div className="driver-page">
        <div className="page-heading">
          <h1>Drivers</h1>
        </div>
        <div className="search-addButtton-container">
          <div className="search-container">
            <input type="text" placeholder="Search" onChange={handleFilter} />
          </div>
          <Link to="/add-driver" className="add-driver-button-container">
            <Button variant="contained" style={{ textTransform: "none" }}>
              + Add New Driver
            </Button>
          </Link>
        </div>
        <div className="data-table-parent-container">
          <h2>List of Drivers</h2>
          <div className="data-table-container">
            <DataTable
              columns={columns}
              data={filteredRecords}
              // pagination
            />
          </div>
        </div>
        {selectedDriverId && (
          <ModalComponent
            login_token={selectedDriverId}
            onClose={() => setSelectedDriverId(null)}
          />
        )}
      </div>
    </div>
  );
}
