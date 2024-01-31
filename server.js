const OpenAI = require("openai");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

const apiUrl = `${process.env.OPEN_PARLIAMENT_API_URL}/bills/`;
const baseUrl = `${apiUrl}?`;

// fetch bills data from OpenParliament API, with filtering
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

app.get("/api/openai", async (req, res) => {
  try {
    const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

    const { billNumber, session } = req.query; // Extract the billNumber query parameter

    const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

    // Construct the assistant's content
    let assistantContent = `searching for bill ${billNumber}`;

    // Construct the user's content using the billNumber parameter
    let userContent = `Simplify and summarize bill ${billNumber}`;

    if (session) {
      userContent += ` from session ${session}`;
      assistantContent += ` from the ${session} session of parliament.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `You are an AI system specialized in providing information about Canadian parliamentary bills. Your responses should be clear, concise, and tailored for a 7th-grade comprehension level. Your first task is to correctly locate the specified bill by ${assistantContent} on "parl.ca". Once confirmed, conduct thorough research using the bill text. Afterward, generate a minimal Dall-E image to visually represent bill themes. Finally, present structured information comprising the Dall-E image, proposed changes, bill intent, pros, cons, and voting status, organized into sections. In addition to this, when users request it, you can provide a list of bills from the current session of parliament.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.5,
      seed: 1,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
