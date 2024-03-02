import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import { TextField, Stack, InputLabel } from "@mui/material";
import myImage from "../../../component-assets/Stepper_1.svg";

function BasicInfoForm({ formData, handleChange, onPlaceSelect }) {
  const [place, setPlace] = useState(null);

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    onPlaceSelect(selectedPlace);
  };

return (
    <React.Fragment>
      <div>
        <Stack spacing={1}>
          <img className="steeper" src={myImage} alt="stepper" />
          <InputLabel htmlFor="Name"> Customer Name</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="name"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
          />

          <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="contact"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
          />

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            name="email_id"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
          />

          <AutoComplete onPlaceSelect={handlePlaceSelect} />

          <InputLabel htmlFor="dob">Date of Birth</InputLabel>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            name="dob"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
          />
        </Stack>
      </div>
    </React.Fragment>
  );
}

export default BasicInfoForm;
