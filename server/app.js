const express = require('express');
const app = express();
const driverRoutes = require('./routes/Driver/driver_routes.js')

const providerRoutes = require('./routes/provider_sign_up/provider_sign_up_route.js')

const customerRoutes = require('./routes/customer/customer_routes.js')


const port = 3000;

app.use(express.json());

// Use the driver routes
app.use('/api/drivers', driverRoutes);
app.use('/api/providers', providerRoutes);

// Use the customer routes acting as a middleware
app.use('/api/customer', customerRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

