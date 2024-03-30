import React from "react";
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
import formSchema from "./formschema";
import "../../CSS/variable.css";

export default function AdditionalInfoForm({
  formData,
  handleChange,
  mealPlans,
  isEditMode,
}) {
  const validateField = (fieldName) => {
    const fieldSchema = formSchema.additionalInfo[fieldName];
    const fieldValue = formData[fieldName];

    if (fieldSchema.required && !fieldValue) {
      return fieldSchema.errorMessage;
    }

    return "";
  };

  return (
    <div className="meal-page-container">
      <Stack spacing={2} className="form-container">
        <InputLabel htmlFor="plan_id">Meal Plan</InputLabel>
        <Select
          className="form"
          name="plan_id"
          value={formData.plan_id}
          onChange={handleChange}
          error={validateField("plan_id") !== ""}
          helperText={validateField("plan_id")}
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
          value={formData.is_veg}
          onChange={handleChange}
          error={validateField("is_veg") !== ""}
          helperText={validateField("is_veg")}
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
          value={formData.diet_notes}
          onChange={handleChange}
          className="form"
          error={validateField("diet_notes") !== ""}
          helperText={validateField("diet_notes")}
        />

        <InputLabel htmlFor="tiffin_quantity">Meal Quantity</InputLabel>
        <Select
          className="form"
          name="tiffin_quantity"
          value={formData.tiffin_quantity}
          onChange={handleChange}
          error={validateField("tiffin_quantity") !== ""}
          helperText={validateField("tiffin_quantity")}
        >
          <MenuItem value="">Select Meal Quantity</MenuItem>
          {[1, 2, 3, 4, 5].map((quantity) => (
            <MenuItem key={quantity} value={quantity}>
              {quantity}
            </MenuItem>
          ))}
        </Select>

        <InputLabel htmlFor="billing_cycle">
          Billing Date (Start Date)
        </InputLabel>
        <TextField
          type="date"
          name="billing_cycle"
          value={formData.billing_cycle}
          onChange={handleChange}
          className="form"
          error={validateField("billing_cycle") !== ""}
          helperText={validateField("billing_cycle")}
        />

        <InputLabel htmlFor="payment">Current Payment</InputLabel>
        <Select
          className="form"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          error={validateField("is_veg") !== ""}
          helperText={validateField("is_veg")}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="true">Paid</MenuItem>
          <MenuItem value="false">Unpaid</MenuItem>
        </Select>

        <FormControl className="form" component="fieldset">
          <FormLabel component="legend">Customer's Subscription:</FormLabel>
          <RadioGroup
            column
            aria-label="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={validateField("status") !== ""}
            helperText={validateField("status")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Active" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </div>
  );
}
