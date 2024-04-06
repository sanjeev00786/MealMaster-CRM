// Retrieve JSON data from local storage
var provider = localStorage.getItem("sb-cvnlpinekwolqaratkmc-auth-token");
let provider_id = "";
// Check if the retrieved data is not null or undefined
if (provider) {
  // Parse the JSON data
  var userData = JSON.parse(provider);

  // Fetch provider from the app_metadata field
  provider_id = userData.user.id;

  // Check if the provider is not null or undefined
  if (provider) {
    // Do something with the provider
    console.log("Provider: " + provider);
  } else {
    // Handle the case when the provider is not found
    console.log("Provider not found in the JSON data");
  }
} else {
  // Handle the case when the JSON data is not found in local storage
  console.log("JSON data not found in local storage");
}

export { provider_id };

const getProviderIdFromLocalStorage = () => {
  let provider_id = "";
  const provider = localStorage.getItem("sb-cvnlpinekwolqaratkmc-auth-token");
  if (provider) {
    const userData = JSON.parse(provider);
    if (userData && userData.user && userData.user.id) {
      provider_id = userData.user.id;
      console.log("Provider ID: " + provider_id);
    } else {
      console.log("Provider ID not found in the user data");
    }
  } else {
    console.log("JSON data not found in local storage");
  }
  return provider_id;
};

export { getProviderIdFromLocalStorage };

export const driver_id = localStorage.getItem("driver_id");

const getDriverIdFromLocalStorage = () => {
  return localStorage.getItem("driver_id");
};

export { getDriverIdFromLocalStorage };

const isCustomerAdded = () => {
  return localStorage.getItem("is_customer_added");
};
export { isCustomerAdded };

const isCustomerUpdate = () => {
  return localStorage.getItem("is_customer_update");
};
export { isCustomerUpdate };

let addedMealName = localStorage.getItem("Plan_name");
export { addedMealName };
let updatedMealPlanName = localStorage.getItem("updatedPlan_name");
console.log("from localstaorbdgdbdgdjd2@@@@@@@@@@@@", updatedMealPlanName);
export { updatedMealPlanName };
