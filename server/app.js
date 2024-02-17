const express = require('express');
const app = express();
const driverRoutes = require('./routes/Driver/driver_routes.js')

const providerRoutes = require('./routes/provider_sign_up/provider_sign_up_route.js')

const customerRoutes = require('./routes/customer/customer_routes.js')

const meal_plan_Routes = require('./routes/meal_plans/meal_plans_route.js')

const port = 3000;

app.use(express.json());

// Use the driver routes
app.use('/api/drivers', driverRoutes);
app.use('/api/providers', providerRoutes);

// Use the customer routes acting as a middleware
app.use('/api/customer', customerRoutes);

// Use the meal_plans routes acting as a middleware
app.use('/api/provider/meal_plans', meal_plan_Routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

