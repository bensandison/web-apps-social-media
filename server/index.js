// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// http://localhost:3001/api will return a message from the server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT)
});