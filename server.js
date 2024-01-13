// Import Express.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uuid = require("./uuid");

// Async read and write file
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, "public")));

// HTML routes
app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname,"public", "notes.html"));
});

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.get("/api/notes", function(req,res) {
  readFileAsync("db.json","utf8").then(function(data) {
    notes= [].concat(JSON.parse(data))
    res.json(notes);
  })
});

app.post("/api/notes", function(req,res) {
  // Recieve new note to save in body
  const note = req.body;
  // Read existing notes
  readFileAsync("db.json","utf8").then(function(data) {
    // Concatenate empty array with data returned
    const notes = [].concat(JSON.parse(data));
    // Use helper function to assign a unique id to new note
    note.id = uuid();
    // Add new note to array
    notes.push(note);
    return notes
  }).then(function(notes) {
    // Update db.json
    writeFileAsync("db.json", JSON.stringify(notes))
    // Return new note to client
    res.json(note);
  })
});





app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);