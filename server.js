const express = require("express");
const dotenv = require("dotenv");
const billsRoutes = require("./src/routes/billsRoutes");
const openaiRoutes = require("./src/routes/openaiRoutes");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Use billsRoutes for bills-related routes
app.use("/api", billsRoutes);

// Use openaiRoutes for OpenAI-related routes
app.use("/api", openaiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
