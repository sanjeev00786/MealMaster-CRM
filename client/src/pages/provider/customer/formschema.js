import { number, string } from "prop-types";
import "../../CSS/variable.css"


const basicInfoSchema = {
    name: {
      required: true,
      errorMessage: "Customer Name is required.",
    },
    contact: {
        required: true,
        type: string, 
        pattern: /^\d+$/, 
        errorMessage: "Contact Number is required and must contain only numbers.",
      },
      email_id: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        errorMessage: "Email is required and must be a valid email address.",
      },
    dob: {
      required: true,
      errorMessage: "Date of Birth is required.",
    },
  };
  
  const additionalInfoSchema = {
    plan_id: {
      required: true,
      errorMessage: "Meal Plan is required.",
    },
    is_veg: {
      required: true,
      errorMessage: "Diet Preference is required.",
    },
    diet_notes: {
      required: false, // Optional field
    },
    tiffin_quantity: {
      required: true,
      errorMessage: "Meal Quantity is required.",
    },
    billing_cycle: {
      required: true,
      errorMessage: "Billing Date is required.",
    },
    status: {
      required: true,
      errorMessage: "Customer's Subscription status is required.",
    },
  };
  
  const formSchema = {
    basicInfo: basicInfoSchema,
    additionalInfo: additionalInfoSchema,
  };
  
  export default formSchema;