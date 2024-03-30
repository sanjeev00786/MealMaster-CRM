import React, { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import CustomButton from "../../../components/CustomButton/CustomButton";
import "../../CSS/variable.css"

// import "../../../components/CustomButton/CustomButton.css";
import "./meal-plan.css";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { provider_id } from "../../../util/localStorage.js";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import { addedMealName } from "../../../util/localStorage.js";

const MealSettingPage = () => {
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const mealData = {
  //     provider_id: provider_id,
  //     plan_name: mealName,
  //     price: mealPrice,
  //     description: mealDescription,
  //   };
  useEffect(() => {
    // Check if all fields are filled
    const isValid = mealName && mealPrice && mealDescription;
    setIsFormValid(isValid);
  }, [mealName, mealPrice, mealDescription]);

  const handleSave = (e) => {
    e.preventDefault();
    const mealData = {
      provider_id: provider_id,
      plan_name: mealName,
      price: mealPrice,
      description: mealDescription,
    };
    console.log(mealData);

    apiHelper
      .post(`${ENDPOINTS.ADD_PLAN}`, mealData)
      .then((response) => {
        console.log("Meal data saved successfully:", response.data);
        const addMealName = response.data.plan_name
      //************************************************** */
        sessionStorage.setItem("Plan_name", addMealName);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isLoaderShow", "true");
        localStorage.setItem("Plan_name", addMealName);
      //************************************************** */
      setTimeout(() => {
        console.log('*****', addedMealName)
        navigate("/meal-plan-list");
      }, 500);
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
    <div className="wholeContent-mealplanpage">
      <div className="meal-plan-formpage">
        {/* <div className="meal-plan-page"> */}
        <div className="sideBarMenu">
          <SideBarMenu currentPage="/meal-plan-list" />
        </div>

        <div className="content-mealplan">
          {/* <div className="cardDisplay"> */}

          <h1>New Meal Plan</h1>

          <div className="meal-page-container">
            <div className="form-container">
              <form>
                <label>
                  Meal Name<span class="required">*</span>
                </label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Enter Meal Name"
                  required
                />

                <label>
                  Meal Price Per Month<span class="required">*</span>{" "}
                </label>
                <input
                  type="number"
                  value={mealPrice}
                  onChange={(e) => setMealPrice(e.target.value)}
                  placeholder="Enter Meal Price Per Month"
                  required
                />

                <label>
                  Description<span class="required">*</span>{" "}
                </label>
                <textarea
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  placeholder="Enter Meal Description"
                  rows="4" // Adjust the number of rows as needed
                  cols="50"
                  required
                />
                <div className="actions">
                  <CustomButton
                    // className={"submitBtn Btn"}
                    //      className={`delete_plan ${
                    //   CheckId.length === 0 ? "disabled_delete" : ""
                    // }`}
                    className={`submitBtn Btn ${!isFormValid ? "disabledSaveBtn" : ""}`}
                    onClick={handleSave}
                    disabled={!isFormValid}
                  >
                    Save
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
        </div>
      </div>

      <>.</>
    </div>
  );
};

export default MealSettingPage;
