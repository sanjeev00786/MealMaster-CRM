import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfoForm from "./BasicInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import "./customerPage.css";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { provider_id } from "../../../util/localStorage.js";

export default function CustomerForm({ customerData }) {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const initialFormData = isEditMode ? customerData : {};
  const [formData, setFormData] = useState(initialFormData);
  const [mealPlans, setMealData] = useState([]);
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState({});

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`
        );
        setMealData(response.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    if (!isEditMode) {
      fetchMealPlans();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (customerData) {
      setIsEditMode(true);
      setFormData(customerData);
      setPlace({
        address: customerData.address,
        city: customerData.city,
        latitude: customerData.latitude,
        longitude: customerData.longitude,
      });
    }
  }, [customerData]);

  let finalDatatoSendToDB = Object.assign(formData, place, {
    provider_id: provider_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const serverApiEndpoint = isEditMode
      ? `${ENDPOINTS.EDIT_CUSTOMER}${customerData.customer_id}`
      : `${ENDPOINTS.ADD_CUSTOMER}`;

    try {
      const response = isEditMode
        ? await apiHelper.put(serverApiEndpoint, finalDatatoSendToDB)
        : await apiHelper.post(serverApiEndpoint, finalDatatoSendToDB);

      console.log(response.message);

      navigate("/customerList/2");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} customer:`,
        error
      );
    }
  };
  console.log(formData);

  return (
    <React.Fragment>
      {/* <div className="mobileSideMenu">
          <AnchorTemporaryDrawer />
        </div>
        <div className="sideMenu">
          <MiniDrawer />
        </div> */}
      <div className="meal-page-container">
        <h2 className="customerH2">Add New Customer</h2>
        <div className="customerFormContainer">
          <form onSubmit={step === 2 ? submitForm : handleNext}>
            {step === 1 && (
              <BasicInfoForm
                formData={formData}
                customerData={customerData}
                handleChange={handleChange}
                onPlaceSelect={handlePlaceSelect}
                isEditMode={isEditMode}
              />
            )}
            {step === 2 && (
              <AdditionalInfoForm
                formData={formData}
                handleChange={handleChange}
                mealPlans={mealPlans}
                isEditMode={isEditMode}
                customerData={customerData}
              />
            )}

            {step === 1 && (
              <div className="actions">
                <button
                  className={"submitBtn Btn"}
                  type="button"
                  onClick={handleNext}
                >
                  Next
                </button>
                <button
                  className={"cancelBtn Btn"}
                  type="button"
                  onClick={() => navigate("/customerList/1")}
                >
                  Cancel
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="actions">
                <button
                  className={"cancelBtn Btn"}
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button className={"submitBtn Btn"} type="submit">
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
