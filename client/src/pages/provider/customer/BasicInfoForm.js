import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import { TextField, Stack, InputLabel } from "@mui/material";
import myImage from "../../../component-assets/Stepper_1.svg";
import "./BasicInfoForm.css"


function BasicInfoForm({ formData, handleChange, onPlaceSelect, isEditMode, customerData  }) {
  const [place, setPlace] = useState(null);

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    onPlaceSelect(selectedPlace);
  };

  return (
    <React.Fragment>
      <div className="meal-page-container">
        <Stack spacing={1} className="form-container">
          {/* <img className="steeper" src={myImage} alt="stepper" /> */}
          <InputLabel htmlFor="Name" > Customer Name</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="name"
            value={isEditMode ? formData.name : formData.value}
            onChange={handleChange}
            fullWidth
            required
            className="form"
          />

          <InputLabel  htmlFor="contactNumber">Contact Number</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="contact"
            value={isEditMode ? formData.contact : formData.value}
            onChange={handleChange}
            fullWidth
            required
            className="form"
          />

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            name="email_id"
            value={isEditMode ? formData.email_id : formData.value}
            onChange={handleChange}
            fullWidth
            required
            className="form"
          />

          <AutoComplete onPlaceSelect={handlePlaceSelect} />

          <InputLabel htmlFor="dob">Date of Birth</InputLabel>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            name="dob"
            value={isEditMode ? formData.dob : formData.value}
            onChange={handleChange}
            fullWidth
            required
            className="form"
          />
        </Stack>        
      </div>
    </React.Fragment>
  );
}

export default BasicInfoForm;
