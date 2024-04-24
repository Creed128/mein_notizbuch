// Import necessary libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const notesController = require('./notesController');
 // Assurez-vous que le chemin d'accès est correct
 const mongoose = require('mongoose');

// Connection à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Initialize dotenv to use .env file for environment variables
dotenv.config();

// Create an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes for API
app.use('/api', routes);  // Utilisation des routes API

// Define a route for a simple GET request
app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

// Start the server on the specified port
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
