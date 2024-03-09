// apiConfig.js
const API_BASE_URL = 'http://localhost:3001';

const ENDPOINTS = {
  GET_DRIVER: '/api/drivers/get-driver',
  GET_ASSIGNED_DELIVERIES: '/api/drivers/',
  UPDATE_DRIVER: '/api/drivers/update-driver',
  UPDATE_DELIVERY_STATUS: '/api/drivers/update-delivery-status-and-photo',
  MOVE_TO_PAST_DELIVERY: '/move-to-past-delivery',
  GET_ASSIGNED_TIFFIN: '/get-assign-tiffin'
  // Add other endpoints as needed
};

export { API_BASE_URL, ENDPOINTS };