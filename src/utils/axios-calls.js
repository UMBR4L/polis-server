const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;
const baseUrl = `${apiUrl}?`;

const fetchBillsFromAPI = async (filterName) => {
  try {
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
      introduced: bill.introduced,
    }));

    return filteredData;
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchBillsFromAPI };
