import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import EditAutoComplete from "./EditAutoComplete";
import { TextField, Stack, InputLabel } from "@mui/material";
import myImage from "../../../component-assets/Stepper_1.svg";
import "./BasicInfoForm.css";

function BasicInfoForm({
  formData,
  handleChange,
  onPlaceSelect,
  isEditMode,
  customerData,
  formErrors
}) {
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
          <InputLabel htmlFor="Name"> Customer Name</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="name"
            value={isEditMode ? formData.name : formData.name}
            onChange={handleChange}
            fullWidth
            required
            className="form"
            error={formErrors.name !== ""}
            helperText={formErrors.name}
          />

          <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
          <TextField
            type="number"
            variant="outlined"
            color="secondary"
            name="contact"
            value={isEditMode ? formData.contact : formData.contact}
            onChange={handleChange}
            fullWidth
            required
            className="form"
            error={formErrors.contact !== ""}
            helperText={formErrors.contact}
          />

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            name="email_id"
            value={isEditMode ? formData.email_id : formData.email_id}
            onChange={handleChange}
            fullWidth
            required
            className="form"
            error={formErrors.email_id !== ""}
            helperText={formErrors.email_id}
          />

          {isEditMode ? (
            <EditAutoComplete
              onPlaceSelect={handlePlaceSelect}
              isEditMode={isEditMode}
              customerData={customerData}
              formErrors= {formErrors}
            />
          ) : (
            <AutoComplete
              onPlaceSelect={handlePlaceSelect}
              isEditMode={isEditMode}
              customerData={customerData}
              formErrors = {formErrors}
            />
          )}

          <InputLabel htmlFor="dob">Date of Birth</InputLabel>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            name="dob"
            value={isEditMode ? formData.dob : formData.dob}
            onChange={handleChange}
            fullWidth
            required
            className="form"
            error={formErrors.dob !== ""}
            helperText={formErrors.dob}
          />
        </Stack>
      </div>
    </React.Fragment>
  );
}

export default BasicInfoForm;
