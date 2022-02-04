import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Establishing database connection
mongoose.connect('mongodb://localhost:27017/social-network')
        .then(() => console.log(`Connected to the database successfully!`))
        .catch(err => console.log(`Couldn't connect to the database, ${err}`));

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