// require items
const express = require(`express`);
const path = require(`path`);
const http = require("http");
const fs = require("fs");
const app = express();

// Define a port to listen for incoming requests
const PORT = 8800;
// Define a port to listen for incoming requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get for notes page
app.get(`/notes`, function (req, res) {
  res.sendFile(path.join(__dirname + "/notes.html"));
});

// app.get for index page
app.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//this function needs to read the db.json file and return all saved notes as a JSON
app.get(`/api/notes`, function (req, res) {});

// this function needs to receive a new note to save on the request body, add it to
// the db.json file, and then return the new note to client
app.post(`/api/notes`, function (req, res) {});
