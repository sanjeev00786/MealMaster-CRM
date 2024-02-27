// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import CustomizedSnackbar from "../../../components/Notification/Notification";
// import "../../../components/Notification/Notification.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import MultiActionAreaCard from "../../../components/Meal-plan-card/Meal-plan-card";
import "../meal-plan/meal-plan-list.css";
import axios from "axios"; 

const MealPlanListPage = () => {
  const [cardData, setCardData] = useState([]);
  const [dataLength, setDataLength] = useState(0); 
  useEffect(() => {
    axios.get("http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3")
      .then(response => {

        console.log(response.data.data);
        setCardData(response.data.data); 
        const length = response.data.data.length;
        setDataLength(length);
        console.log("Number of entries in the database:", length);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  
  const handleCardButtonClickDelete =async (plan_id) => {
    console.log("Button clicked for plan with ID:", plan_id);
      try {
        await axios.delete(
          "http://localhost:3001/api/provider/meal_plans/delete-meal-plan",
        plan_id
        );
  
        console.log(`Meal plan with ID ${plan_id} deleted successfully`);
  
      } catch (error) {
        console.error("Error deleting meal plan:", error);
      }
  };

  const handleCardButtonClickEdit = (plan_id) => {
    console.log("Button clicked for plan withEdit ID:", plan_id);
  };

return (
  <div className="cardDisplay">
    <div className="login-container">
      <Header />
    </div>
    {/* <CustomizedSnackbar customMessage={"Hey"}/> */}
  
    <h1>Meal Setting</h1>
    <div className="meal-plan-list-container">
        {cardData.map((data, index) => (
          <MultiActionAreaCard key={index} data={data}  onCardButtonClickDelete={handleCardButtonClickDelete} onCardButtonClickEdit={handleCardButtonClickEdit}/>
        ))}
    </div>
  </div>
);
};



export default MealPlanListPage;