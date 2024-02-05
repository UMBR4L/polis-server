const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env
const { fetchBillsFromAPI } = require("../utils/api.js");

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;
const baseUrl = `${apiUrl}?`;

// Define a route to fetch bills data from OpenParliament API with filtering
router.get("/bills", async (req, res) => {
  try {
    // Get the filter query parameter from the request
    const filterName = req.query.filter;

    // Call the fetchBillsFromAPI function and pass the filterName
    const filteredData = await fetchBillsFromAPI(filterName);

    // Send the response data back to the client
    res.json(filteredData);
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route to fetch details of a specific bill with a session number
router.get("/bills/:session/:billID", async (req, res) => {
  try {
    // Get the session number and bill number from the URL parameters
    const { session, billID } = req.params;

    // Construct the URL for fetching specific bill details
    const billDetailsUrl = `${apiUrl}${session}/${billID}/`;

    // Make a GET request to the OpenParliament API for the specific bill
    const response = await axios.get(billDetailsUrl);

    // Extract the relevant data from the response
    const {
        number,
        name,
        sessionID,
        status,
        law,
        introduced,
        legisinfo_url,
      } = response.data;
  
      // Create an object with the specified keys
      const billDetails = {
        bill_id: number,
        title: name.en,
        session_id: sessionID,
        status: status.en,
        law: law,
        introduced: introduced,
        legisinfo_url: legisinfo_url,
      };
  
      // Send the bill details as the response
      res.json(billDetails);
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
