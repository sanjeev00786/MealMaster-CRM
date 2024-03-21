import React, { useState, useEffect } from "react";
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
import { ENDPOINTS } from "../../../apiConfig.js";
import { provider_id } from "../../../util/localStorage.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";

export default function DriverForm(driverData) {

  console.log(driverData);

export default function DriverForm() {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { filePath, uploadToCloudinary } = useCloudinaryUpload({
    cloudName: "djencgbub",
    uploadPreset: "s8ygrkym",
  });

  const initialFormData = isEditMode
    ? driverData[0]
    : {
        name: "",
        photo_url: "",
        contact: "",
        email_id: "",
        address: "",
        login_token: "",
        provider_id: provider_id,
      };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (driverData) {
      setIsEditMode(true);
      setFormData(driverData.driverData[0]);
    }
  }, [driverData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      photo_url: filePath,
    });
  };
  console.log(driverData.driverData[0])
  console.log(formData)

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     console.log(formData);

  //     const response = await apiHelper.post(
  //       `${ENDPOINTS.ADD_DRIVER}`,
  //       formData
  //     );

  //     setLoading(false);
  //     setFormData({
  //       name: "",
  //       photo_url: "",
  //       contact: "",
  //       email_id: "",
  //       address: "",
  //       login_token: "",
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error submitting form:", error);
  //     setNotificationMessage("Something went wrong!!");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serverApiEndpoint = isEditMode
      ? `${ENDPOINTS.UPDATE_DRIVER}`
      : `${ENDPOINTS.ADD_DRIVER}`;

    try {
      const response = isEditMode
        ? await apiHelper.put(serverApiEndpoint, formData)
        : await apiHelper.post(serverApiEndpoint, formData);

      console.log(response.message);
      // navigate("/driverList/1");

      setLoading(false);
      setFormData({
        name: "",
        photo_url: "",
        contact: "",
        email_id: "",
        address: "",
        login_token: "",
      });

      window.location.href = "/drivers";
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} driver:`,
        error
      );
    }
  };

  function handleFileDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        uploadToCloudinary(file);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleFileSelect(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        uploadToCloudinary(file);
      };
      reader.readAsDataURL(file);
    }
  }

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
              value={isEditMode ? formData.name : formData.value}
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
              required
            />
            <div
              style={{
                width: "90%",
                height: "200px",
                border: "2px dashed #ccc",
                textAlign: "center",
                padding: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundColor: "#F2F4F8"
              }}
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <p>Drop your file(s) here or click and browse</p>
              )}
            </div>

            <label>Driver's Contact Number</label>
            <input
              type="text"
              name="contact"
              value={isEditMode ? formData.contact : formData.value}
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
            <label>Driver's Email</label>
            <input
              type="email"
              name="email_id"
              value={isEditMode ? formData.email_id : formData.value}
              value={formData.email_id}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
            <label>Driver's Address</label>
            <input
              type="text"
              name="address"
              value={isEditMode ? formData.address : formData.value}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
            <label>Driver's Login Token</label>
            <input
              type="text"
              name="login_token"
              value={isEditMode ? formData.login_token : formData.value}
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
