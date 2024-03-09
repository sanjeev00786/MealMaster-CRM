import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicInfoForm from "./BasicInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import "./customerPage.css";

export default function CustomerForm({ customerData }) {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const initialFormData = isEditMode ? customerData : { name: "", contact: "", email_id: "", dob: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [mealPlans, setMealData] = useState([]);
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState({});

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
    provider_id: "5de05e6c-162f-4293-88d5-2aa6bd1bb8a3",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  


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
      ? `http://localhost:3001/api/customer/edit-customer/${customerData.customer_id}`
      : "http://localhost:3001/api/customer/add-customer";

    try {
      const response = isEditMode
        ? await axios.put(serverApiEndpoint, finalDatatoSendToDB)
        : await axios.post(serverApiEndpoint, finalDatatoSendToDB);

      console.log(response.data.message);
      navigate("/customerList");
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "adding"} customer:`, error);
    }
  };

  return (
    <React.Fragment>
      <div className="login-container">
        {/* <div className="mobileSideMenu">
          <AnchorTemporaryDrawer />
        </div>
        <div className="sideMenu">
          <MiniDrawer />
        </div> */}
      </div>
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
                  onClick={() => navigate("/customerList")}
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
                <button className={"submitBtn Btn"} type="submit"  >
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
