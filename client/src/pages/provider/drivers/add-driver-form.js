import React, { useState } from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import "./add-driver-form.css";
import Loader from "../../../components/Loader/Loader";
import CustomizedSnackbar from "../../../components/Notification/Notification";
import useCloudinaryUpload from "../../../util/FileUpload/FileUpload";
// import  DragAndDrop  from "../../../util/DragAndDrop/DragAndDrop";
import { ENDPOINTS } from '../../../apiConfig.js';
import { provider_id } from "../../../util/localStorage.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";


export default function DriverForm() {
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { filePath, uploadToCloudinary } = useCloudinaryUpload({
    cloudName: "djencgbub",
    uploadPreset: "s8ygrkym",
  });

  const [formData, setFormData] = useState({
    name: "",
    photo_url: "",
    contact: "",
    email_id: "",
    address: "",
    login_token: "",
    provider_id: provider_id,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      photo_url: filePath,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(formData);

      const response = await apiHelper.post(
        `${ENDPOINTS.ADD_DRIVER}`,
        formData
      );

      setLoading(false);
      setFormData({
        name: "",
        photo_url: "",
        contact: "",
        email_id: "",
        address: "",
        login_token: "",
      });
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
            New Driver
          </Typography>
          <AccountCircleIcon />
        </Toolbar>
      </div>
      {/* <div className="form"> */}
      <div className="meal-page-container">

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Driver's Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
          <label>Driver's Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadToCloudinary}
            // required
          />
          <label>Driver's Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
          <label>Driver's Email</label>
          <input
            type="email"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          <label>Driver's Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
          <label>Driver's Login Token</label>
          <input
            type="text"
            name="login_token"
            value={formData.login_token}
            onChange={handleChange}
            placeholder="Enter login token"
            required
          />
          <div className="actions">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-button  Btn"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            className="clear-button Btn"
            onClick={() =>
              setFormData({
                name: "",
                photo_url: "",
                contact: "",
                email_id: "",
                address: "",
                login_token: "",
              })
            }
          >
            Clear
          </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
