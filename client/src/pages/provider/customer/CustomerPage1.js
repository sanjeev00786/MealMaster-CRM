import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfoForm from "./BasicInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import "../../CSS/variable.css"

import "./customerPage.css";
import { ENDPOINTS } from "../../../apiConfig.js";
import apiHelper from "../../../util/ApiHelper/ApiHelper.js";
import { provider_id } from "../../../util/localStorage.js";
import formSchema from "./formschema";
import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
import Loader from "../../../components/Loader/Loader";



export default function CustomerForm({ customerData }) {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const initialFormData = isEditMode ? customerData : {};
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [mealPlans, setMealData] = useState([]);
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState({});
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true)
        const response = await apiHelper.get(
          `${ENDPOINTS.GET_MEAL_PLAN}provider_id=${provider_id}`
        );
        setLoading(false)
        const activePlans = []
        for (const i of response.data) {
          if (i.is_active === true) {
            activePlans.push(i)
          }
        }
        setMealData(activePlans);
      } catch (error) {
        setLoading(false)
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
    const currentStepSchema = formSchema[step === 1 ? "basicInfo" : "additionalInfo"];
    const fieldsToValidate = Object.keys(currentStepSchema);
    let isValid = true;

    const updatedFormErrors = {};

    fieldsToValidate.forEach((fieldName) => {
      const fieldSchema = currentStepSchema[fieldName];
      if (fieldSchema.required && !formData[fieldName]) {
        updatedFormErrors[fieldName] = fieldSchema.errorMessage;
        isValid = false;
      }
    });

    setFormErrors(updatedFormErrors);

    if (isValid) {
      setLoading(true)
      setStep(step + 1);
      setLoading(false)
    }
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
      setLoading(true)
      navigate("/customerList/1");
      setLoading(false)
    } catch (error) {
      console.error(
        setLoading(false)
        `Error ${isEditMode ? "updating" : "adding"} customer:`,
        error
      );
    }
  };
  console.log(formData);

  return (
    <React.Fragment>
      <div className="customer-page-container">
      <Loader loading={loading} />
      <div className="sideBarMenu">
        <SideBarMenu currentPage="/customers" />
      </div>

        <div className="customer-page">
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
                formErrors={formErrors} 
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
      </div>
      </div>
    </React.Fragment>
  );
}
