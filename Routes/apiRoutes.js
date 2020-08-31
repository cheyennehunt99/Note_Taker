const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dbNotes = require('../db/db.json');


module.exports = function (app) {

     // API ROUTES
        // ========================================================
    
        // Setup the /api/notes GET route

    app.get('/api/notes', function (req, res) {

          // Setup notes variable
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            notes = JSON.parse(data);
             // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });
    });

   // Setup the /api/notes POST route
    app.post('/api/notes', function (req, res) {

  // Receives a new note, adds it to db.json, then returns the new note
        let notes = req.body;
        notes.id = uuidv4();

        let notesArr = [];

        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            notesArr = JSON.parse(data);
            notesArr.push(notes);

            fs.writeFile('./db/db.json', JSON.stringify(notesArr), function (err) {
                if (err) {
                    console.log(err);
                }
                return res.json(notesArr);
            });
        });

    });

     // Deletes a note with specific id
    app.delete('/api/notes/:id', function (req, res) {
        let noteId = req.params.id;
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            const notesArr = JSON.parse(data);

            console.log(notesArr)

            const newNotesArr = notesArr.filter(item => item.id !== noteId);

            console.log("-------------")

            console.log(newNotesArr)

            fs.writeFile('./db/db.json', JSON.stringify(newNotesArr), function (err) {
                if (err) {
                    console.log(err)
                }
                return res.json(dbNotes);
            })

        });
    });

}