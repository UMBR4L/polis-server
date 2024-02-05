const axios = require("axios");
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

// Function to simplify the language of the given to a 7th-grade comprehension level
async function simplifyLanguage(jsonWithNewlinesAndBackslashes) {
  try {
    const requestData = {
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Simplify the language of the provided JSON to a 7th-grade comprehension level. Your responses should always produce JSON with the following keys and relevant values: 'Intent', 'Proposed Changes', 'Pros', 'Cons', 'Progress'.`,
        },
        {
          role: "user",
          content: jsonWithNewlinesAndBackslashes,
        },
      ],
      temperature: 0.1,
      seed: 1,
      max_tokens: 1000,
      top_p: 0.1,
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
      console.log(response.data.choices[0].message.content)
    //  // Convert the response to a JSON object
    //  const responseObject = JSON.parse(response);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { simplifyLanguage };
