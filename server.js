const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;

// Define a route to fetch bills data from OpenParliament API with filtering
app.get("/api/bills", async (req, res) => {
  try {
    // Define the base API URL
    // const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;

    // Define the filter parameter to fetch bills introduced after January 1st, 2020
    const introducedAfterDate = "2020-01-01";

    // Define the limit and offset for pagination
    const limit = 1000;
    const offset = 0;

    // Construct the URL with the filter parameters, limit, and offset
    const apiUrlWithDateFilter = `${apiUrl}?introduced__gt=${introducedAfterDate}&limit=${limit}&offset=${offset}`;

    // Make a GET request to the OpenParliament API using Axios
    const response = await axios.get(apiUrlWithDateFilter);

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
