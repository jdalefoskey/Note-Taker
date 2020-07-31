const express = require("express");

const fs = require("fs");

const path = require("path");

//port setup
let PORT = process.env.PORT || 3000;

let app = express();

// express setup
let notes = require("./db/db.json");

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// api gets
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Display
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});

//  Listening
app.listen(PORT, function () {
  console.log("listening on PORT " + PORT);
});

// Delete
app.delete("/api/notes/:id", function (req, res) {
  let noteID = req.params.id;
  fs.readFile("db/db.json", "utf8", function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log("note.id", note.id);
      console.log("noteID", noteID);
      return note.id !== noteID;
    });
    notes = updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("deleted from db.json");
      }
    });
    res.json(stringifyNote);
  });
});

// new note
app.post("/api/notes", function (req, res) {
  let randoms = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  let id = randoms + Date.now();
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("db/db.json", stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log(" Saved to db.json");
    }
  });
});
