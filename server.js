const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static('public'))
const port = process.env.PORT || 5000

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname,"/public/notes.html"));
})

app.get('/api/notes', (req,res) => {
  console.log('hello');
  fs.readFile('db.json', (err,data) => {
    let jsonData = JSON.parse(data);
    res.json(jsonData);
    console.log(jsonData);
  })
})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"));
})

app.post('/api/notes', function(req,res) {
  let postStuff = req.body;

  fs.readFile('db.json', (err,data) => {
    let jsonData = JSON.parse(data);
    postStuff.id = jsonData.length;
    jsonData.push(postStuff);
    fs.writeFile('db.json', JSON.stringify(jsonData), (err,data) => {
      if (err) throw err;
      res.redirect('/api/notes');
    })
  });
})

app.delete("/api/notes/:id", (req,res) => {
  let noteId = req.params.id;
  fs.readFile('db.json', (err,data) => {
    let jsonData = JSON.parse(data);
    let filteredData = jsonData.filter(note => {
      return note.id !== parseInt(noteId);
    })
    let i=0;
    let updatedIds = filteredData.map(note => {
      note.id = i;
      i++;
      return note;
    })
    fs.writeFile('db.json', JSON.stringify(updatedIds), (err,data) => {
      if (err) throw err;
      res.send('note deleted');
    })
  })
})

app.listen(port)

