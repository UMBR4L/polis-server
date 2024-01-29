const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup (e.g., body parsing)
app.use(express.json());

// Define your API routes here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
