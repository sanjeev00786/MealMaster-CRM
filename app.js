const express = require('express');
const app = express();
const driverRoutes = require('./server/routes/Driver/driver_routes.js')
const providerRoutes = require('./server/routes/provider_sign_up/provider_sign_up_route.js')

const port = 3000;

app.use(express.json());

// Use the driver routes
app.use('/api/drivers', driverRoutes);
app.use('/api/providers', providerRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

