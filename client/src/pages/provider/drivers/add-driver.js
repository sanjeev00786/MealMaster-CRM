import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import './add-driver.css';

export default function DriverPage() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

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
      name: "Email",
      selector: (row) => row.email_id,
    },
    {
      name: "Actions",
      cell: (row) => (
        <a href="#" onClick={() => handleViewDetails(row)}>View Details</a>
      ),
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/drivers/get-all-drivers?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3"
        );
        setRecords(response.data.data);
        setFilteredRecords(response.data.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const newData = records.filter(row =>
      row.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRecords(newData);
  };

  const handleViewDetails = (row) => {

    axios.get(`http://localhost:3001/api/drivers/get-driver?login_token=${row.login_token}`)
      .then((response) => {
        console.log("Driver details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching driver details:", error);
      });
  };

  return (
    <div className="driver-page-container">
      <div className="toolBar">
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h5"
              id="tableTitle"
              component="div"
            >
              Drivers
            </Typography>
            <AccountCircleIcon />
          </Toolbar>
        </div>
        <div
          className="below"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
      <div className="search-container">
        <input
          type="text"
          placeholder="Search...."
          onChange={handleFilter}
          className="search-input"
        />
      </div>
      <Link to="/add-driver">
      <Button variant="contained">+ New Driver</Button>
      </Link>
      </div>
      <DataTable
        columns={columns}
        data={filteredRecords}
        pagination
      />
    </div>
  );
}

