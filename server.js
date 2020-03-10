// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const shortid = require("shortid");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(data);
  });
  
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
  
    data.push(newNote);
  
    fs.writeFile("./json/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log("test");
  
    });
  
    return res.json(true);
  
  });
  
  app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    data = data.filter(function (note) {
      if (note.id === id) {
        return false;
      }
      return true;
    });
  
    fs.writeFile("./json/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
      res.end();
    });
  
    return res.json(data);
  
  });  

app.use('*', (_, res) => {
	res.redirect('/');
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });