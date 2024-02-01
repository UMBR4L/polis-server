const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const router = express.Router();

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;
const baseUrl = `${apiUrl}?`;

// Define a route to fetch bills data from OpenParliament API with filtering
router.get("/bills", async (req, res) => {
  try {
    // Get the filter query parameter from the request
    const filterName = req.query.filter;

    // Define the limit and offset for pagination
    const limit = 500;
    const offset = 0;

    // Define the filter parameters based on the chosen filter
    let filterParameters = "";

    switch (filterName) {
      case "introducedAfter2020":
        filterParameters = "introduced__gt=2020-01-01";
        break;
      case "becameLaw":
        filterParameters = "law=true";
        break;
      case "notBecameLaw":
        filterParameters = "law=false";
        break;
      case "currentSession":
        filterParameters = "session=44-1";
        break;
      default:
        // No filter selected, fetch all bills
        break;
    }

    // Construct the URL with the selected filter
    const apiUrlWithFilter =
      baseUrl + filterParameters + "&limit=" + limit + "&offset=" + offset;

    // Make a GET request to the OpenParliament API using Axios
    const response = await axios.get(apiUrlWithFilter);

    // Filter and map the response data into the desired object format
    const filteredData = response.data.objects.map((bill) => ({
      bill_ID: bill.number,
      title: bill.name.en,
      session_ID: bill.session,
    }));

    // Send the response data back to the client
    res.json(response.data);
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
