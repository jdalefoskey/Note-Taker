//gather all my required
const fs = require('fs')

const path = require('path')

const express = require('express')

// grab port 8800

let PORT = process.env.PORT || 8800
let app = express()

// get express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
let notes = require('./db/db.json')

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// delete
app.delete('/api/notes/:id', function (req, res) {
  let noteID = req.params.id
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    let updatedNotes = JSON.parse(data).filter(note => {
      console.log('note.id', note.id)
      console.log('noteID', noteID)
      return note.id !== noteID
    })
    notes = updatedNotes
    const stringifyNote = JSON.stringify(updatedNotes)
    fs.writeFile('db/db.json', stringifyNote, err => {
      if (err) console.log(err)
      else {
        console.log('saved db.json')
      }
    })
    res.json(stringifyNote)
  })
})

// start a new note
app.post('/api/notes', function (req, res) {
  let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  let id = randLetter + Date.now()
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text
  }
  console.log(typeof notes)
  notes.push(newNote)
  const stringifyNote = JSON.stringify(notes)
  res.json(notes)
  fs.writeFile('db/db.json', stringifyNote, err => {
    if (err) console.log(err)
    else {
      console.log('saved db.json')
    }
  })
})

// show the notes
app.get('/api/notes', function (req, res) {
  fs.readFile('db/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    res.json(notes)
  })
})

app.listen(PORT, function () {
  console.log('listening on PORT ' + PORT)
})

// errors
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
