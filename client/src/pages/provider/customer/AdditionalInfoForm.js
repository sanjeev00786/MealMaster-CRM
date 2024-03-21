import React from "react";
import myImg from "../../../component-assets/Stepper_2.svg";
import {
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

export default function AdditionalInfoForm({
  formData,
  handleChange,
  mealPlans,
  isEditMode,
  customerData,
}) {
  return (
    <div className="meal-page-container">
      <Stack spacing={2} className="form-container">
        {/* <img className="steeper" src={myImg} alt="stepper" /> */}

        <InputLabel htmlFor="plan_id">Meal Plan</InputLabel>
        <Select
          className="form"
          name="plan_id"
          value={isEditMode ? formData.plan_id : formData.value}
          onChange={handleChange}
        >
          <MenuItem value="">Select a meal plan</MenuItem>
          {mealPlans.length > 0 ? (
            mealPlans.map((plan) => (
              <MenuItem key={plan.plan_id} value={plan.plan_id}>
                {plan.plan_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Loading meal plans...
            </MenuItem>
          )}
        </Select>

        <InputLabel htmlFor="is_veg">Diet Preference</InputLabel>
        <Select
          className="form"
          name="is_veg"
          value={isEditMode ? formData.is_veg : formData.is_veg}
          onChange={handleChange}
        >
          <MenuItem value="">Select a diet preference</MenuItem>
          <MenuItem value="vegetarian">Vegetarian</MenuItem>
          <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
          <MenuItem value="vegan">Vegan</MenuItem>
        </Select>

        <InputLabel htmlFor="diet_notes">
          Additional Notes (Optional)
        </InputLabel>
        <TextField
          type="text"
          name="diet_notes"
          value={isEditMode ? formData.diet_notes : formData.diet_notes}
          onChange={handleChange}
          className="form"
        />

        <InputLabel htmlFor="tiffin_quantity">Meal Quantity</InputLabel>
        <Select
          className="form"
          name="tiffin_quantity"
          value={isEditMode ? formData.tiffin_quantity : formData.tiffin_quantity}
          onChange={handleChange}
        >
          <MenuItem value="">Select Meal Quantity</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>

        <InputLabel htmlFor="billing_cycle">
          Billing Date (Start Date)
        </InputLabel>
        <TextField
          type="date"
          name="billing_cycle"
          value={isEditMode ? formData.billing_cycle : formData.billing_cycle}
          onChange={handleChange}
          className="form"
        />

        <FormControl className="form" component="fieldset">
          <FormLabel component="legend">Customer's Subscription:</FormLabel>
          <RadioGroup
            column
            aria-label="status"
            name="status"
            value={isEditMode ? formData.status : formData.status}
            onChange={handleChange}
          >
            <FormControlLabel value="TRUE" control={<Radio />} label="Active" />
            <FormControlLabel
              value="FALSE"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </div>
  );
}
