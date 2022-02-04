import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Fetching routes
import users from './routes/users.js';

app.use(express.json());
app.use(bodyParser.json());

// Linking routes
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  const URL = `http://localhost:${port}`;
  console.log(`Server running on port: ${URL}`);
});