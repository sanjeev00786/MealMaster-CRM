import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import "../dashboard/dashboard.css";
import Loader from "../../../components/Loader/Loader";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { ENDPOINTS } from "../../../apiConfig.js";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import "./track-deliveries.css";
import { provider_id } from "../../../util/localStorage.js";

export default function TrackDeliveries() {
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  console.log(records);

  useEffect(() => {
    const driverData = async (id) => {
      setLoading(true);
      try {
        const res = await apiHelper.get(
          `${ENDPOINTS.GET_ALL_DRIVER}provider_id=${id}`
        );
        console.log(res);
        setRecords(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    driverData(`${provider_id}`);
  }, []);

  const handleTrackDriver = (row) => {
    // Navigate to TrackDriver component with driverID as state
    const rowDataString = JSON.stringify(row);
    const encodedRowDataString = encodeURIComponent(rowDataString);
    console.log('TRACKING START', rowDataString);
    navigate(`/trackDriver/driverID=${row.driver_id}?rowData=${encodedRowDataString}`);
  };

  const columns = [
    {
      id: 1,
      name: "Driver Name",
      selector: (row) => row.name,
      grow: 2,
      sortable: true,
    },
    {
      id: 2,
      name: "Contact Number",
      selector: (row) => row.contact,
      grow: 1,
      sortable: true,
    },
    {
      id: 3,
      name: "Actions",
      cell: (row, index, columnId) => {
        return (
          <div>
            {row.driver_status ? (
              <button className="trackDriverBtn" onClick={() => handleTrackDriver(row)}>
                Track Driver
              </button>
            ) : (
              <span>Driver Offline</span>
            )}
          </div>
        );
      },
      grow: 1,
      button: true,
    },
  ];

  const customStyles = {
    table: {
      width: "100%",
    },
  };

  console.log(filteredData);

  const handleFilter = (event) => {
    const newData = filteredData.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  return (
    <div className="customer-page-container">
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/trackdeliveries" />
      </div>
      <div
        className="customer-page"
      // style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="page-heading">
          <h1>Track Driver</h1>
        </div>
        <div className="search-addButton-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search...."
              onChange={handleFilter}
              className="search-input"
            />
          </div>
        </div>
        <div className="data-table-parent-container">
          <h2>List of Drivers</h2>

          <div className="data-table-container">
            <DataTable
              columns={columns}
              data={records}
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}
