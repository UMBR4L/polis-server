const OpenAI = require("openai");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env
const knex = require("knex");
const knexfile = require("../../knexfile.js");

// Create a database connection using your knexfile
const db = knex(knexfile);

router.get("/openai", async (req, res) => {
  try {
    const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

    const { billNumber, session } = req.query; // Extract the billNumber query parameter

    const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });

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

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI system specialized in providing information about Canadian parliamentary bills. Your responses should be clear, concise, and tailored for a 7th-grade comprehension level. Your first task is to correctly locate the specified bill by the assistant on Bing. Once confirmed, conduct thorough research using the bill text. Afterward, generate a minimal Dall-E image to visually represent bill themes. Finally, present structured information comprising the Dall-E image, proposed changes, bill intent, pros, cons, and voting status, organized into sections. In addition to this, when users request it, you can provide a list of bills from the current session of parliament.`,
        },
        {
          role: "assistant",
          content: assistantContent,
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

module.exports = router;
