// const axios = require("axios");

// exports.handler = async function (event, context) {
//   try {
//     const { input } = event.queryStringParameters;
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyCkPMQbY9-dA9BdFECSTIxwZqa7mXIwOgY`
//     );

//     return {
//       statusCode: 200,
//       body: JSON.stringify(response.data),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Internal Server Error" }),
//     };
//   }
// };