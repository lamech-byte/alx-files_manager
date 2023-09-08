// Import necessary modules
import express from 'express';
import routes from './routes/index';
const app = express();

// Define the port to listen on
const port = process.env.PORT || 5000;

// Use the routes in the Express app
app.use(express.json());

routes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
