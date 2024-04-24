// Import necessary libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv to use .env file for environment variables
dotenv.config();

// Create an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for a simple GET request
app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

// Start the server on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
