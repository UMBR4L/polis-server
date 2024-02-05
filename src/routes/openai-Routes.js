const axios = require("axios");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env
const rateLimit = require("express-rate-limit");
const knex = require("knex");
const knexfile = require("../../knexfile.js");

// Import the utility function
const cleanUpJson = require("../utils/clean-up-json.js");
const { simplifyLanguage } = require("../utils/openai.js");

// Create a rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 10, // Limit to 10 requests per 15 minutes
  message: "Too many requests from this IP, please try again later.",
});

// // Create a database connection using your knexfile
const db = knex(knexfile);

// Apply the rate limiter to the /api/openai route
router.use("/openai", limiter);

// Keep track of the last request time
let lastRequestTime = 0;

router.get("/openai", async (req, res) => {
  try {
    // Calculate the time elapsed since the last request
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - lastRequestTime;

    // Check if the time elapsed is less than a minimum delay (e.g., 2 seconds)
    if (timeElapsed < 10000) {
      // Delay the request by the remaining time to meet the 2-second minimum
      const delayTime = 10000 - timeElapsed;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }

    // Update the last request time
    lastRequestTime = new Date().getTime();

    const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

    const { billNumber, session } = req.query; // Extract the billNumber query parameter

    // Fetch bill data from the database based on billNumber and session
    const billData = await db("bills")
      .select("title", "bill_ID", "session_ID", "introduced") // Adjust column names as needed
      .where({ bill_ID: billNumber, session_ID: session })
      .first();

    if (!billData) {
      return res.status(404).json({ error: "Bill not found" });
    }

    // Construct the assistant's content
    let assistantContent = `Search for bill ${billNumber} - ${billData.title}.`;

    // Construct the user's content using the billNumber parameter
    let userContent = `Simplify and summarize bill ${billNumber}`;

    if (session) {
      userContent += ` from session ${session}`;
      assistantContent += ` from the ${session} session of parliament.`;
    }

    // Define the request data for the OpenAI API
    const requestData = {
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an AI system specialized in providing extensive, accurate, and organized information about Canadian parliamentary bills. Your responses should always produce JSON with the following keys and relevant values: 'Name', 'Intent', 'Changes', 'Pros', 'Cons', 'Progress'. Your responses should be comprehensive with multiple bullet points per section. Your first task is to accurately locate the specified bill by the assistant on "parl.ca". Once confirmed, conduct thorough research using the bill text on LegisInfo and provide an extensive analysis of its content.`,
        },
        {
          role: "assistant",
          content: `${assistantContent} Your value for "Name" should be the title of the bill. Your bullet points for "Intent", "Changes", "Pros", and "Cons" should be specific and comprehensive.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 1,
      seed: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    // Make an Axios POST request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
      }
    );

    jsonWithNewlinesAndBackslashes = response.data.choices[0].message.content;

    // Call the simplifyLanguage function to simplify the language in the cleaned JSON
    const simplifiedJson = await simplifyLanguage(
      jsonWithNewlinesAndBackslashes
    );

    // Remove newlines and backslashes from the JSON string
    const cleanedJson = await cleanUpJson(simplifiedJson);

    res.json(cleanedJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
