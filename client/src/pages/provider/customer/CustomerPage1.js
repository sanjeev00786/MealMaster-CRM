import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicInfoForm from "./BasicInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import "./customerPage.css";

export default function CustomerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [mealPlans, setMealData] = useState([]);
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState({});

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

  const datafromLocalStorage = localStorage.getItem(
    "sb-cvnlpinekwolqaratkmc-auth-token"
  );
  const data = JSON.parse(datafromLocalStorage);
  const provider_id = {
    provider_id: data.user.id 
  };
  console.log(provider_id);



  let finalDatatoSendToDB = Object.assign(formData, place);

  console.log(finalDatatoSendToDB);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const serverApiEndpoint = "http://localhost:3001/api/customer/add-customer";

    try {
      const response = await axios.post(serverApiEndpoint, finalDatatoSendToDB);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <React.Fragment>
      <h2 className="customerH2">Add New Customer</h2>
      <div className="customerFormContainer">
        <form onSubmit={step === 2 ? submitForm : handleNext}>
          {step === 1 && (
            <BasicInfoForm
              formData={formData}
              handleChange={handleChange}
              onPlaceSelect={handlePlaceSelect}
            />
          )}
          {step === 2 && (
            <AdditionalInfoForm
              formData={formData}
              handleChange={handleChange}
              mealPlans={mealPlans}
            />
          )}

          {step === 1 && (
            <>
              <button
                className="customerFormButton"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
              <button
                className="customerFormButton"
                type="button"
                onClick={() => navigate("/driver_login")}
              >
                Cancel
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button
                className="customerFormButton"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
              <button className="customerFormButton" type="submit">
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}
