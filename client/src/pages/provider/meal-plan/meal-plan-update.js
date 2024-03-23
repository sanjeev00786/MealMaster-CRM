import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Header from "../../../components/header/header";
import CustomButton from "../../../components/CustomButton/CustomButton";
import axios from "axios";
import { navigate } from "react-router-dom";
import { ENDPOINTS } from "../../../apiConfig.js";

import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { provider_id } from "../../../util/localStorage.js";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import "./meal-plan-update.css";
import Loader from "../../../components/Loader/Loader";

const MealPlanUpdatePage = () => {
  const { plan_id } = useParams();
  console.log(plan_id, "dgeteheee");
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`
        );
        console.log("response", response);

        if (response.success) {
          const allMealPlans = response.data;

          const selectedMealPlan = allMealPlans.find(
            (plan) => plan.plan_id === plan_id
          );
          console.log("plan", selectedMealPlan);

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
    setLoading(true);
    try {
      let updateData = {plan_id: plan_id };
      console.log('MEAL ID', updateData)
      let url = `${ENDPOINTS.UPDATE_MEAL_PLAN}`;
      // console.log(updateData,"updatedtaa")
      const updateResponse = await apiHelper.put(url, updateData);
      console.log("*********UPDATE",updateResponse);
      if (updateResponse.success) {
        addNewPlan();
      } else {
        setLoading(false);
        console.error("Failed to update meal plan:", updateResponse.message);
        return;
      }
      // const addResponse = await axios.post(newConfig);
    } catch (error) {
      setLoading(false);
      console.log("Error updating and adding meal plan:", error);
    }
  };
  const handleCancel = () => {
    console.log("Cancelled");
    navigate("/meal-plan-list");
  };

  async function addNewPlan() {
    let newData = {
      provider_id: `${provider_id}`,
      plan_name: mealName,
      price: mealPrice,
      description: mealDescription,
    };
    console.log("newData", newData);
    let url = `${ENDPOINTS.ADD_PLAN}` 

    const addResponse = await apiHelper.post(url, newData);
    console.log("add respose", addResponse);
    if (addResponse.success) {
      console.log("Meal plan added successfully");
      setLoading(false);
      const updatedMealPlanName = addResponse.data.plan_name
      console.log(updatedMealPlanName,"updated jhgdjdghjhgfshgshjggfsfg-------------------22222")
      // ********************************************************

      sessionStorage.setItem("updatedPlan_name", updatedMealPlanName);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("updatedplan","true");
      localStorage.setItem("isLoaderShow", "true");
      localStorage.setItem("updatedPlan_name", updatedMealPlanName);

      // ********************************************************

      navigate("/meal-plan-list");
    } else {
      setLoading(false);
      console.error("Failed to add meal plan:", addResponse.message);
      return;
    }
  }

  return (
    <div className="wholeContent-mealplanUpdatepage">
      <Loader loading={loading} />
      <div className="meal-plan-formpage">
        <div className="sideBarMenu">
          <SideBarMenu currentPage="/meal-plan-list" />
        </div>
        <div className="content-mealplan">
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
                  <CustomButton
                    className={"submitBtn Btn"}
                    onClick={handleUpdate}
                  >
                    Update
                  </CustomButton>
                  <CustomButton
                    className={"cancelBtn Btn"}
                    onClick={handleCancel}
                  >
                    Cancel
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>

          <>.</>
        </div>
      </div>
    </div>
  );
};
export default MealPlanUpdatePage;
