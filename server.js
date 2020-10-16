const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static('public'))
const port = process.env.PORT || 5000

// route handlers ==================================================================
app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname,"/public/notes.html"));
})

app.get('/api/notes', (req,res) => {
  // send parsed json db to be rendered on notes.html
  fs.readFile('db.json', (err,data) => {
    let jsonData = JSON.parse(data);
    res.json(jsonData);
    console.log(jsonData);
  })
})

// placed this route handler after all other get requests otherwise app wouldn't work
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"));
})

app.post('/api/notes', function(req,res) {
  let postStuff = req.body;

  fs.readFile('db.json', (err,data) => {
    // parse json data in db.json
    let jsonData = JSON.parse(data);
    // create 'id' property and set it equal to the length of the array before adding the new note in
    postStuff.id = jsonData.length;
    // add note to json db
    jsonData.push(postStuff);
    // overwrite json db with new array
    fs.writeFile('db.json', JSON.stringify(jsonData), (err,data) => {
      if (err) throw err;
      // redirect to get request route handler
      res.redirect('/api/notes');
    })
  });
})

app.delete("/api/notes/:id", (req,res) => {
  let noteId = req.params.id;
  fs.readFile('db.json', (err,data) => {
    let jsonData = JSON.parse(data);
    // remove the note with id equal to the route parameter id
    let filteredData = jsonData.filter(note => {
      return note.id !== parseInt(noteId);
    })
    // update 'id' properties for all notes
    let i=0;
    let updatedIds = filteredData.map(note => {
      note.id = i;
      i++;
      return note;
    })
    // overrite json db with updated note array
    fs.writeFile('db.json', JSON.stringify(updatedIds), (err,data) => {
      if (err) throw err;
      res.send('note deleted');
    })
  })
})

app.listen(port)

