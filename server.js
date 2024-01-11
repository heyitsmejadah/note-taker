// Import Express.js
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));
app.use(express.json());

// HTML routes
app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname,"public", "notes.html"));
});

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});





app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);