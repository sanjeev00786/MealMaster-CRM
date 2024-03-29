import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Header from "../../../components/header/header";
import CustomButton from "../../../components/CustomButton/CustomButton";
import axios from "axios";
import { navigate } from "react-router-dom";
import { ENDPOINTS } from '../../../apiConfig.js';

import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { provider_id } from "../../../util/localStorage.js";

const MealPlanUpdatePage = () => {
  const { plan_id } = useParams();
  console.log(plan_id,"dgeteheee");
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`
        );

        if (response.data.success) {
          const allMealPlans = response.data.data;

          const selectedMealPlan = allMealPlans.find(
            (plan) => plan.plan_id === plan_id
          );

          if (selectedMealPlan) {
            setMealName(selectedMealPlan.plan_name);
            setMealPrice(selectedMealPlan.price);
            setMealDescription(selectedMealPlan.description);
          } else {
            console.error(`Meal plan with ID ${plan_id} not found.`);
          }
        } else {
          console.error("Failed to fetch meal plans:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlan();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault(); 
    try {
        let updateData = JSON.stringify({ "plan_id": plan_id });
        let updateConfig = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `${ENDPOINTS.UPDATE_MEAL_PLAN}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: updateData
        };
      
        const updateResponse = await apiHelper.request(updateConfig);
      
        if (updateResponse.data.success) {
          console.log("Meal plan updated successfully");
        } else {
          console.error("Failed to update meal plan:", updateResponse.data.message);
          return;
        }
      // have to pass dynamic provider_id
        let newData = JSON.stringify({
          "provider_id": "${provider_id}",
          "plan_name": mealName,
          "price": mealPrice,
          "description": mealDescription
        });
      
        let newConfig = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${ENDPOINTS.ADD_PLAN}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: newData
        };
      
        const addResponse = await axios.request(newConfig);
      
        if (addResponse.data.success) {
          console.log("Meal plan added successfully");
          navigate("/meal-plan-list");
        } else {
          console.error("Failed to add meal plan:", addResponse.data.message);
          return;
        }
      
      } catch (error) {
        console.error("Error updating and adding meal plan:", error);
      }
    
  };
  const handleCancel = () => {
    console.log("Cancelled");
   navigate("/meal-plan-list");

  };
  

  return (
    <div>
      <h1>Edit Meal Plan</h1>

      <div className="meal-page-container">

        <div className="form-container">
          <form>
            <label>Meal Name</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter Meal Name"
              required
            />

            <label>Meal Price Per Month </label>
            <input
              type="number"
              value={mealPrice}
              onChange={(e) => setMealPrice(e.target.value)}
              placeholder="Enter Meal Price Per Month"
              required
            />

            <label>Description </label>
            <textarea
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              placeholder="Enter Meal Description"
              required
            />
            <div className="actions">
              <CustomButton className={"submitBtn Btn"} onClick={handleUpdate}>
                Update
              </CustomButton>
              <CustomButton className={"cancelBtn Btn"} onClick={handleCancel}
              >Cancel</CustomButton>
            </div>
          </form>
        </div>
      </div>

      <>.</>
    </div>
  );

};
export default MealPlanUpdatePage;
