const axios = require("axios");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env
const knex = require("knex");
const knexfile = require("../../knexfile.js");

// Import the utility function
const cleanUpJson = require("../utils/clean-up-json.js");
const { simplifyLanguage } = require("../utils/openai.js");

// // Create a database connection using your knexfile
const db = knex(knexfile);

router.get("/openai", async (req, res) => {
  try {
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
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an AI system specialized in providing extensive, accurate, and organized information about Canadian parliamentary bills. Your responses should always produce JSON with the following keys and relevant values: 'Intent', 'Proposed Changes', 'Pros', 'Cons', 'Progress'. Your responses should be comprehensive with multiple bullet points per section. Your first task is to accurately locate the specified bill by the assistant on "parl.ca". Once confirmed, conduct thorough research using the bill text on LegisInfo and provide an extensive analysis of its content.`,
        },
        {
          role: "assistant",
        content: `${assistantContent} Your bullet points for "Proposed Changes", "Pros", and "Cons" should be specific and comprehensive.` ,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.5,
      seed: 1,
      max_tokens: 1000,
      top_p: 0.5,
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
    const simplifiedJson = await simplifyLanguage(jsonWithNewlinesAndBackslashes);

    // Remove newlines and backslashes from the JSON string
    const cleanedJson = cleanUpJson(simplifiedJson);

    res.json(cleanedJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
