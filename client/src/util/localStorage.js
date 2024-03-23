// Retrieve JSON data from local storage
var provider = localStorage.getItem("sb-cvnlpinekwolqaratkmc-auth-token");
let provider_id = ''
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

let driver_id = localStorage.getItem('driver_id');

export { driver_id };

let addedMealName = localStorage.getItem('Plan_name');

export { addedMealName };
let updatedMealPlanName = localStorage.getItem('updatedPlan_name');
console.log("from localstaorbdgdbdgdjd2@@@@@@@@@@@@",updatedMealPlanName)
export { updatedMealPlanName };

