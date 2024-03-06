// apiConfig.js
const API_BASE_URL = 'http://localhost:3001';

const ENDPOINTS = {
  GET_DRIVER: '/api/drivers/get-driver',
  GET_ASSIGNED_DELIVERIES: '/api/drivers/',
  UPDATE_DRIVER: '/api/drivers/update-driver'
  // Add other endpoints as needed
};

export { API_BASE_URL, ENDPOINTS };