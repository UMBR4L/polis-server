const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env
const port = process.env.PORT || 8000;
const billsRoutes = require("./src/routes/bills-Routes");
const openaiRoutes = require("./src/routes/openai-Routes");

// express and cors middleware
app.use(express.json());
app.use(cors());

// Use billsRoutes for bills-related routes
app.use("/api", billsRoutes);

// Use openaiRoutes for OpenAI-related routes
app.use("/api", openaiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
