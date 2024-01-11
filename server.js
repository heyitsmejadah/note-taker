// Import Express.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("./uuid");

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

// API routes
app.get("/api/notes", (req,res) => {
  const notes = JSON.parse(fs.readFileSync("db.json", "utf8"));
  res.json(notes);
});

app.post("/api/notes", (req,res) => {
  // Recieve new note to save in body
  const newNote = req.body;
  // Read existing notes
  const notes = JSON.parse(fs.readFileSync("db.json","utf8"));
  // Use helper function to assign a unique id to new note
  newNote.id = uuid();
  // Add new note to array
  notes.push(newNote);
  // Update db.json
  fs.writeFileSync("db.json",JSON.stringify(notes));
  // Return new note to client
  res.json(newNote);
});





app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);