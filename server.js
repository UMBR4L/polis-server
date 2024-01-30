const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;
const baseUrl = `${apiUrl}?`;

// fetch bills data from OpenParliament API filtering
app.get("/api/bills", async (req, res) => {
  try {
    // Get the filter query parameter from the request
    const filterName = req.query.filter;

    // // Define the filter parameter to fetch bills introduced after January 1st, 2020
    // const introducedAfterDate = "2020-01-01";
    // const currentSession = "44-1"

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
    console.log(apiUrlWithFilter);

    // Construct the URL with the filter parameters, limit, and offset
    // const apiUrlWithDateFilter = `${apiUrl}?session=${currentSession}&limit=${limit}&offset=${offset}`;

    // Make a GET request to the OpenParliament API using Axios
    const response = await axios.get(apiUrlWithFilter);

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
