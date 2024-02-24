import React from "react";

export default function AdditionalInfoForm({ formData, handleChange, mealPlans }) {
  
  
  return ( 
  <div>
  <label>
    Meal Plan:
    <select
      type="uuid"
      name="plan_id"
      value={formData.value}
      onChange={handleChange}
    >
      <option value="">Select a meal plan</option>
      {mealPlans.length > 0 ? (
        mealPlans.map((plan) => (
          <option key={plan.plan_id} value={plan.plan_id}>
            {plan.plan_name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          Loading meal plans...
        </option>
      )}
    </select>
  </label>
  <label>
    Diet Preference:
    <select
      type="text"
      name="is_veg"
      value={formData.value}
      onChange={handleChange}
    >
      <option value="">Select a diet preference</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="non-vegetarian">Non-Vegetarian</option>
      <option value="vegan">Vegan</option>
    </select>
  </label>
  <label>
    Additional Notes(Optional)
    <input
      type="text"
      name="diet_notes"
      value={formData.value}
      onChange={handleChange}
    />
  </label>

  <label>
    Meal Quantity:
    <select
      type="number"
      name="tiffin_quantity"
      value={formData.value}
      onChange={handleChange}
    >
      <option value="">Select Meal Quantity</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </label>
  <label>
    Billing Date (Start Date)
    <input
      type="date"
      name="billing_cycle"
      value={formData.value}
      onChange={handleChange}
    />
  </label>
  <label>
   Customer's Subscription:
    <input
      type="radio"
      name="status"
      value="TRUE"
      checked={formData.status === "TRUE"}
      onChange={handleChange}
    />
    Active
    <input
      type="radio"
      name="status"
      value="FALSE"
      checked={formData.status === "FALSE"}
      onChange={handleChange}
    />
    Inactive
  </label>
  </div>);
}