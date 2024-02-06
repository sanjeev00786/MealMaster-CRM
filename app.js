const express = require('express');
const app = express();
const driverRoutes = require('./server/routes/Driver/driver_routes.js')
const customerRoutes = require('./server/routes/customer/customer_routes.js')
const meal_plan_Routes = require('./server/routes/meal_plans/meal_plans_route.js')

const port = 3000;

app.use(express.json());

// Use the driver routes
app.use('/api/drivers', driverRoutes);

// Use the customer routes acting as a middleware
app.use('/api/customer', customerRoutes);

// Use the meal_plans routes acting as a middleware
app.use('/api/meal_plans', meal_plan_Routes);

// app.use('/api/')




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

