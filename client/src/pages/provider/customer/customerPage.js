import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customerPage.css";

export default function CustomerForm1() {
  const [formData, setFormData] = useState({});
  const [mealPlans, setMealData] = useState([]);
  let checkApi = false;

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3"
        );
        setMealData(response.data.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    if (checkApi === false) {
      checkApi = true;
      fetchMealPlans();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const serverApiEndpoint = "http://localhost:3001/api/customer/add-customer";

    try {
      const response = await axios.post(serverApiEndpoint, formData);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact Number
          <input
            type="text"
            name="contact"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email_id"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            name="dob"
            value={formData.value}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
