const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: '*', // Allow requests from any origin
  credentials: true,
};

// Apply CORS with the specified options globally
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Routes
const driverRoutes = require('./routes/Driver/driver_routes.js');
const providerRoutes = require('./routes/provider_sign_up/provider_sign_up_route.js');
const customerRoutes = require('./routes/customer/customer_routes.js');
const mealPlanRoutes = require('./routes/meal_plans/meal_plans_route.js');

// Use the driver routes
app.use('/api/drivers', driverRoutes);

// Use the provider routes
app.use('/api/providers', providerRoutes);

// Use the customer routes
app.use('/api/customer', customerRoutes);

// Use the meal_plans routes
app.use('/api/provider/meal_plans', mealPlanRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
