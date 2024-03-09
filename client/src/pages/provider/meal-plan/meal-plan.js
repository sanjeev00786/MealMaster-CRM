import React, { useState } from "react";
import Header from "../../../components/header/header";
import CustomButton from "../../../components/CustomButton/CustomButton";
// import "../../../components/CustomButton/CustomButton.css";
import "./meal-plan.css";
import axios from "axios";
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from "react-router-dom";

const MealSettingPage = () => {
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    const mealData = {
      provider_id: "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3", 
      plan_name: mealName,
      price: mealPrice,
      description: mealDescription,
    };

    console.log(mealData);

    axios
      .post(
        "http://localhost:3001/api/provider/meal_plans/add-meal-plan",
        mealData
      )
      .then((response) => {
        console.log("Meal data saved successfully:", response.data);
        navigate("/meal-plan-list");

      })
      .catch((error) => {
        console.error("Error saving meal data:", error);
      });
  };

  const handleCancel = () => {
    console.log("Cancelled");
    navigate("/meal-plan-list");

  };
  
  return (
    <div>
      <div className="login-container">
        <Header />
      </div>
      <h1>New Meal Plan</h1>

      <div className="meal-page-container">
        
        <div className="form-container">
          <form>
            <label>Meal Name<span class="required">*</span></label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter Meal Name"
              required
            />

            <label>Meal Price Per Month<span class="required">*</span> </label>
            <input
              type="number"
              value={mealPrice}
              onChange={(e) => setMealPrice(e.target.value)}
              placeholder="Enter Meal Price Per Month"
              required
            />

            <label>Description<span class="required">*</span> </label>
            <textarea
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              placeholder="Enter Meal Description"
              required
            />
            <div className="actions">
              <CustomButton className={"submitBtn Btn"} onClick={handleSave}>
                Save
                
              </CustomButton>
              <CustomButton className={"cancelBtn Btn"} onClick={handleCancel}>
                Cancel
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
     
      <>.</>

    </div>
  );
};

export default MealSettingPage;
