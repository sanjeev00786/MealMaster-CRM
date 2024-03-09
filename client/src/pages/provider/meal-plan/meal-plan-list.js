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
import AnchorTemporaryDrawer from "../../../components/MobileSideMenu/MobileSideMenu";
import "../dashboard/dashboard.css";
import Loader from "../../../components/Loader/Loader";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TransitionsModal from "../../../components/MealModal/MealModal";

const MealPlanListPage = () => {
  const [cardData, setCardData] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1]=useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const providerId = "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3"; //need to fecth from session
  const [isModalOpen, setModalOpen] = useState(false);
  const [delete_selected_plan, set_delete_selected_plan] = useState([]);
  const [planNameData, setPlanNameData] = useState([]);
  const [value, setValue] = useState([]);

  const [CheckId, setCheckId] = useState([]);

  const fetchMealPlans = (providerId) => {
    setLoading(true);

    axios
      .get(
        `http://localhost:3001/api/provider/meal_plans/get-meal-plan?provider_id=${providerId}`
      )
      .then((response) => {
        const activePlans = response.data.data.filter((plan) => plan.is_active);
        setCardData(activePlans);
        setPlanNameData(response.data.data);
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

  // const handleCardButtonClickDelete = async (plan_id) => {
  //   console.log("Button clicked for plan with ID:", plan_id);
  //   try {
  //     await axios.delete(
  //       "http://localhost:3001/api/provider/meal_plans/delete-meal-plan",
  //       { data: { plan_id } }
  //     );

  //     console.log(`Meal plan with ID ${plan_id} deleted successfully`);
  //     setNotificationMessage("Meal Plan deleted.");
  //     fetchMealPlans(providerId);
  //     setModalOpen(false);
  //   } catch (error) {
  //     console.error("Error deleting meal plan:", error);
  //   }
  // };

  const handleCardButtonClickEdit = async (plan_id) => {
    navigate(`/meal-plan-update/${plan_id}`);
    console.log(`Meal plan with Edit ID ${plan_id} sent`);
  };
  const handleCardButtonCheckbox = async (plan_id, upd) => {
    set_delete_selected_plan([plan_id]);
    console.log(plan_id, "checkedbox");
    setCheckId([1]);
  };

  const handleButtonDeleteMealPlan = () => {
    setCheckId([5]);
    if (CheckId.length > 0) {
      setModalOpen(true);
    }
  };
  const handleCancel = () => {
    console.log("Cancelled");
    setModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed");
    const plan_id = delete_selected_plan;
    console.log(delete_selected_plan, "from checckbox");

    try {
      deleteMealPlan(plan_id);
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }

    setModalOpen(false);
  };
  


  const deleteMealPlan = async (plan_id) => {
    console.log("Button clicked for plan with ID:", plan_id);
    console.log("length",plan_id.length)

   
    console.log(planNameData,"wholedata")
    
    const selectedPlans = planNameData.filter((plan) => plan_id.includes(plan.plan_id));
    console.log(selectedPlans,"seletedplan")
    // const planNames = selectedPlans.map((selectedPlan) => selectedPlan.plan_name);
  // console.log(planNames, "planNames");
  // console.log(selectedPlans[0].plan_name, "planName");

    try {
      await axios.delete(
        "http://localhost:3001/api/provider/meal_plans/delete-meal-plan",
        { data: { plan_id } }
      );

      // console.log(`Meal plan with ID ${plan_id} deleted successfully`);
      setNotificationMessage("Deleted");
      setNotificationMessage1( `"${selectedPlans[0].plan_name}" Meal plan Sucessfully Deleted! `);
      // console.log(selectedPlans[0].plan_name, "planNamebelow");


      fetchMealPlans(providerId);
      setCheckId([0]);
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      setNotificationMessage("Error");
      setNotificationMessage1( `"${selectedPlans[0].plan_name}" unable to delete Meal plan`);
      throw error;
    }
  };

  return (
    <div className="cardDisplay">
      <h1>Meal Plans</h1>

      <TransitionsModal
        modalTitle="Delete Meal Plan"
        modalDescription="Are you sure you want to delete selected meal plan(s)?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <div className="meal-plan-buttons">
      <div className="new-plan-button-container plan-page-button ">
        <Button
          variant="contained"
          startIcon={
            <svg
              width="18"
              height="21"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5 3.47795V3.70495C14.799 3.82373 16.0927 3.99454 17.378 4.21695C17.4751 4.23376 17.5678 4.26952 17.6511 4.32218C17.7343 4.37485 17.8063 4.4434 17.8631 4.52391C17.9198 4.60441 17.9601 4.69531 17.9817 4.7914C18.0033 4.88749 18.0058 4.9869 17.989 5.08395C17.9722 5.18099 17.9364 5.27378 17.8838 5.35701C17.8311 5.44023 17.7626 5.51227 17.682 5.56901C17.6015 5.62575 17.5106 5.66607 17.4146 5.68768C17.3185 5.70929 17.2191 5.71176 17.122 5.69495L16.913 5.65995L15.908 18.7299C15.8501 19.4835 15.5098 20.1875 14.9553 20.701C14.4008 21.2146 13.6728 21.4999 12.917 21.4999H5.08401C4.3282 21.4999 3.60026 21.2146 3.04573 20.701C2.4912 20.1875 2.15095 19.4835 2.09301 18.7299L1.08701 5.65995L0.878007 5.69495C0.78096 5.71176 0.681552 5.70929 0.58546 5.68768C0.489368 5.66607 0.398473 5.62575 0.317964 5.56901C0.15537 5.45442 0.0449542 5.27994 0.0110065 5.08395C-0.0229412 4.88795 0.0223602 4.6865 0.136945 4.52391C0.25153 4.36131 0.426012 4.2509 0.622007 4.21695C1.90727 3.99427 3.20099 3.82347 4.50001 3.70495V3.47795C4.50001 1.91395 5.71301 0.577948 7.31601 0.526948C8.43872 0.491017 9.56229 0.491017 10.685 0.526948C12.288 0.577948 13.5 1.91395 13.5 3.47795ZM7.36401 2.02595C8.45473 1.99106 9.54629 1.99106 10.637 2.02595C11.39 2.04995 12 2.68395 12 3.47795V3.59095C10.0018 3.46959 7.99817 3.46959 6.00001 3.59095V3.47795C6.00001 2.68395 6.60901 2.04995 7.36401 2.02595ZM7.00901 7.97095C7.0052 7.87246 6.98203 7.77568 6.94082 7.68614C6.89961 7.59661 6.84117 7.51606 6.76883 7.44911C6.69649 7.38216 6.61168 7.33011 6.51923 7.29594C6.42678 7.26177 6.3285 7.24614 6.23001 7.24995C6.13152 7.25376 6.03474 7.27693 5.9452 7.31814C5.85567 7.35935 5.77512 7.41779 5.70817 7.49012C5.64122 7.56246 5.58917 7.64728 5.555 7.73973C5.52083 7.83218 5.5052 7.93046 5.50901 8.02895L5.85601 17.0289C5.8637 17.2277 5.95004 17.4153 6.09604 17.5504C6.16833 17.6173 6.25309 17.6693 6.34548 17.7035C6.43787 17.7376 6.53608 17.7533 6.63451 17.7494C6.73293 17.7456 6.82964 17.7225 6.91912 17.6813C7.0086 17.6401 7.08909 17.5817 7.15599 17.5094C7.22289 17.4371 7.27491 17.3524 7.30905 17.26C7.3432 17.1676 7.35881 17.0694 7.35501 16.9709L7.00901 7.97095ZM12.489 8.02895C12.4963 7.92857 12.4834 7.82773 12.4509 7.73246C12.4185 7.63719 12.3672 7.54942 12.3001 7.47439C12.233 7.39936 12.1515 7.3386 12.0604 7.29574C11.9694 7.25287 11.8706 7.22877 11.77 7.22488C11.6694 7.22098 11.5691 7.23737 11.475 7.27307C11.3809 7.30877 11.2949 7.36304 11.2222 7.43266C11.1496 7.50227 11.0916 7.58581 11.0519 7.67829C11.0122 7.77077 10.9915 7.8703 10.991 7.97095L10.644 16.9709C10.6363 17.1699 10.708 17.3637 10.8432 17.5098C10.9784 17.6559 11.1661 17.7423 11.365 17.7499C11.5639 17.7576 11.7577 17.686 11.9038 17.5508C12.0499 17.4156 12.1363 17.2279 12.144 17.0289L12.489 8.02895Z"
                fill="#AEAEAE"
              />
            </svg>
          }
          // className="delete_plan"
          //have to chenge the css according to the disable function
         
          className={`delete_plan ${
            CheckId.length === 0 ? "disabled_delete" : ""
          }`}
          disabled={CheckId.length === 0}
          onClick={handleButtonDeleteMealPlan}
        >
          Delete Meal Plan
        </Button>
      </div>

      <div className="new-plan-button-container plan-page-button">
        <Link to="/meal-plan" className="new-plan-button">
          <Button variant="contained" className="add_plan">
            + Add New Meal Plan
          </Button>
        </Link>
      </div>
      </div>

      {notificationMessage && (
        <CustomizedSnackbar decisionMessage={notificationMessage} updateMessage={notificationMessage1} />
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
            // onCardButtonClickDelete={handleCardButtonClickDelete}
            onCardButtonClickEdit={handleCardButtonClickEdit}
            onCardButtonclickCheckBox={handleCardButtonCheckbox}
          />
        ))}
      </div>
    </div>
  );
};

export default MealPlanListPage;
