import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Loader from "../../../components/Loader/Loader";
import CustomizedSnackbar from "../../../components/Notification/Notification";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { ENDPOINTS } from "../../../apiConfig.js";
import { provider_id } from "../../../util/localStorage";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import axios from "axios";

export default function EditDriverForm() {
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const location = useLocation();

  const { login_token } = useParams();
  console.log(login_token);
  const [formData, setFormData] = useState({
    provider_id: provider_id,
  });

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_DRIVER}?login_token=${login_token}`
        );
        setFormData(response.data);
        console.log(formData);
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };

    if (login_token) {
      fetchDriverData();
    }
  }, [login_token]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const driverId = formData[0].driver_id;
    console.log(driverId);

    setLoading(true);
    try {
      const formDataToSend = {
        name: formData.name,
        contact: formData.contact,
        email_id: formData.email_id,
        address: formData.address,
        driver_id: driverId,
      };

      console.log(formDataToSend);

      const response = await apiHelper.put(
        `${ENDPOINTS.UPDATE_DRIVER}`,
        formDataToSend
      );

      window.location.href = "/drivers";
      setLoading(false);
      setNotificationMessage("Driver details updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      setNotificationMessage("Something went wrong!!");
    }
  };

  return (
    <div className="form-page-container">
      <Loader loading={loading} />
      {notificationMessage && (
        <CustomizedSnackbar customMessage={notificationMessage} />
      )}

      <div className="sideBarMenu">
        <SideBarMenu currentPage="/drivers" />
      </div>

      <div className="meal-page-container">
        <div className="page-heading">
          <h1 className=" underline">Edit Driver</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Driver's Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={`${formData[0]?.name || "Enter name"}`}
            />

            <label>Driver's Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder={`${formData[0]?.contact || "Enter contact number"}`}
            />
            <label>Driver's Email</label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              placeholder={`${formData[0]?.email_id || "Enter email"}`}
            />
            <label>Driver's Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={`${formData[0]?.address || "Enter address"}`}
            />
            <label>Driver's Login Token</label>
            <input
              type="text"
              name="login_token"
              value={formData.login_token}
              onChange={handleChange}
              placeholder={`${formData[0]?.login_token || "Enter Login Token"}`}
            />
            <div className="actions">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button  Btn"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                className="clear-button Btn"
                component={Link}
                to={`/drivers`}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
