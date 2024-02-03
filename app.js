const express = require('express');
const app = express();
const driverRoutes = require('./server/routes/Driver/driver_routes.js')
const port = 3000;

app.use(express.json());

// Use the driver routes
app.use('/api/drivers', driverRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});