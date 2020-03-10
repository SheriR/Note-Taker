// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const shortid = require("shortid");

let newNoteArray = require('./db/db.json');



// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });
  
  
  
app.post("/api/notes", (req, res) => {
    //const newNote = req.body;

    let noteId = shortid.generate();

    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    };
          
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
  
        const allNotes = JSON.parse(data);
  
        allNotes.push(newNote);
  
        fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
          if (err) throw err;
          res.end();
          console.log("Note created!")
        });
      });
    });
 

//app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;

//    newNoteArray = newNoteArray.filter(function (note) {
//         if (note.id === id) {
//           delete newNoteArray;
//         }
//     });

//     fs.writeFile("./db/db.json", JSON.stringify(newNoteArray), function (err) {
//       if (err) throw err;
//       console.log("Write Success!")
//     });
  
//     res.end();
  
//   });  

app.use('*', (_, res) => {
	res.redirect('/');
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });