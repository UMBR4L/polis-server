const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY }); // Pass the API key as an option

async function main() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices[0]);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content:
          'You are an AI system tasked with providing information about Canadian parliamentary bills. Please ensure your responses are clear, concise, and written at a 7th-grade comprehension level. Your process includes accurately identifying specified bills, verifying details on "parl.ca" for accuracy, conducting in-depth research using bill text and relevant URLs, generating a minimal Dall-E image to represent bill themes, and presenting structured information comprising the Dall-E image, proposed changes, bill intent, pros, cons, and voting status as the headings for which all text in your response will be organized into. Additionally, when requested by the user, you can also list bills in the current session of parliament. ',
      },
      {
        role: "user",
        content: "Simplify and summarize bill C-51",
      },
    ],
    temperature: 0.5,
    seed: 1,
    max_tokens: 500,
    top_p: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);
  console.log(response.choices[0].message);
  console.log(response.choices[0].message.content);
}

// async function listModels() {
//   const list = await openai.models.list();

//   for await (const model of list) {
//     console.log(model);
//   }
// }

// // listModels();

main();
