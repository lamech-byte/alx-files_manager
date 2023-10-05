/*
 * Create the Express server
 */

import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
