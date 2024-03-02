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
import MiniDrawer from "../../../components/SideMenu/SideMenu";
import AnchorTemporaryDrawer from '../../../components/MobileSideMenu/MobileSideMenu'
import "../dashboard/dashboard.css";
import Loader from '../../../components/Loader/Loader';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MealPlanListPage = () => {
  const [cardData, setCardData] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const providerId = "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3";

  const fetchMealPlans = (providerId) => {
    setLoading(true);

    axios
      .get(`http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=${providerId}`)
      .then((response) => {
        const activePlans = response.data.data.filter((plan) => plan.is_active);
        setCardData(activePlans);

        setTimeout(() => {
          setLoading(false);
        }, 1000);

      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchMealPlans(providerId);
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
      setNotificationMessage('Meal Plan deleted.')
      fetchMealPlans(providerId);
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
      <div className="new-plan-button-container">
        <Link to="/meal-plan" className="new-plan-button">
          <Button variant="contained">+ Add Plan</Button>
        </Link>
      </div>
      {notificationMessage && (
        <CustomizedSnackbar customMessage={notificationMessage} />
      )}
      <Loader loading={loading} />
      <div className="mobileSideMenu">
        <AnchorTemporaryDrawer />
      </div>
      <div className="sideMenu">
        <MiniDrawer />
      </div>
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
