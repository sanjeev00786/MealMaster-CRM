// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Header from "../../../components/header/header";
import CustomizedSnackbar from "../../../components/Notification/Notification";
// import "../../../components/Notification/Notification.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import MultiActionAreaCard from "../../../components/Meal-plan-card/Meal-plan-card";
import "../meal-plan/meal-plan-list.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MealPlanListPage = () => {
  const [cardData, setCardData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");
  useEffect(() => {
    // need to access provider id from session
    axios
      .get(

        "http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=5de05e6c-162f-4293-88d5-2aa6bd1bb8a3"
      )
      .then((response) => {
        const activePlans = response.data.data.filter((plan) => plan.is_active);

        console.log(activePlans);
        setCardData(activePlans);
        const length = activePlans.length;
        setDataLength(length);

        console.log("Number of entries in the database:", length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();
  const handleCardButtonClickDelete = async (plan_id) => {
    console.log("Button clicked for plan with ID:", plan_id);
    try {
      await axios.delete(
        "http://localhost:3001/api/provider/meal_plans/delete-meal-plan",
        { data: { plan_id } }
      );

      console.log(`Meal plan with ID ${plan_id} deleted successfully`);

      window.location.reload();
      <CustomizedSnackbar customMessage="Meal Deleted Successfully" />;
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  const handleCardButtonClickEdit = async (plan_id) => {
    
    navigate(`/meal-plan-update/${plan_id}`);
    console.log(`Meal plan with Edit ID ${plan_id} sent`);

    
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
          <MultiActionAreaCard
            key={index}
            data={data}
            onCardButtonClickDelete={handleCardButtonClickDelete}
            onCardButtonClickEdit={handleCardButtonClickEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default MealPlanListPage;
