// Import necessary modules
const express = require('express');
const app = express();

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Load routes from the routes/index.js file
const routes = require('./routes');

// Use the routes in the Express app
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
