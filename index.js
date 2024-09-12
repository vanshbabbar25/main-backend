const express = require('express');
const connectToMongo = require('./db');  
const app = express();
const port = 5000;
const cors = require('cors');

// Middleware to parse JSON
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectToMongo();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`GradFlow backend Server is running on http://localhost:${port}`);
});
// setting routers for authorization and notes
app.use('/api/alumini',require('./routes/aluminiAuth.js'));
