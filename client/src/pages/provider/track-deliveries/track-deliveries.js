import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import "../dashboard/dashboard.css";
import Loader from "../../../components/Loader/Loader";
import apiHelper from "../../../util/ApiHelper/ApiHelper";
import { ENDPOINTS } from "../../../apiConfig.js";

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
          `${ENDPOINTS.GET_ASSIGNED_DELIVERIES}/get-all-drivers?provider_id=${id}`
        );
        console.log(res);
        setRecords(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    driverData("5de05e6c-162f-4293-88d5-2aa6bd1bb8a3");
  }, []);

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
              <button onClick={() => navigate("/trackDriver")}>
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
    <div
      className="customer-page-container_form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* <div className="mobileSideMenu">
          <AnchorTemporaryDrawer />
        </div>
        <div className="sideMenu">
          <MiniDrawer />
        </div>
        <Loader loading={loading} />
      <div><button onClick={() => navigate("/customers")}>Add New Customer</button></div> */}

      <div className="flex justify-centre">
        <input
          type="text"
          placeholder="Search...."
          onChange={handleFilter}
          className="p-10 pl-10"
        />
      </div>
      <p >Hello Tailwind!</p>
      <div className="mt-30">
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
      />
      </div>
    </div>
  );
}
