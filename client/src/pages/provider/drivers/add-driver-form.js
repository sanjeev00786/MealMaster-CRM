import React, { useState } from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import supabase from '../../../supabase';
import axios from "axios";
import "./add-driver-form.css";

export default function DriverForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    photo_url: "",
    contact: "",
    email_id: "",
    address: "",
    login_token: "",
    provider_id: "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3",
 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setFormData({
  //     ...formData,
  //     image: file,
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // // Upload the image to Supabase storage
      // const { data, error } = await supabase.storage
      //   .from("Media/driver_images")
      //   .upload(`public/${formData.image.name}`, formData.image);

      // if (error) {
      //   throw error;
      // }

      // // Get the URL of the uploaded image
      // const imageUrl = data.Location;

      // // Include the image URL in the formData
      // setFormData({
      //   ...formData,
      //   photo_url: imageUrl,
      // });

      const response = await axios.post(
        "http://localhost:3001/api/drivers/add-driver?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3",
        formData
      );

      console.log("Response:", response.data);
      setFormData({
        name: "",
        photo_url: "",
        contact: "",
        email_id: "",
        address: "",
        login_token: "",
  
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-page-container">
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
      <div className="form">
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
          {/* <label>Driver's Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          /> */}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            className="clear-button"
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
        </form>
      </div>
      </div>
  );
}
