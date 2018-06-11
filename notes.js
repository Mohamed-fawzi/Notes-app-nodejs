
const fs = require('fs');                                       // Including the File System module

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');   // Get notes as a String
        return JSON.parse(notesString);                        // Parsing the notes to be an objet "Array of notes" and return this object
    }
    catch(e){
        return [];
    }
};
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));     // Write the notes back to the data file as a String  
};
var addNote = (title, body) => {
    var notes = fetchNotes();  
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);  // Check for duplicate titles
    if(duplicateNotes.length === 0){
        notes.push(note);                                               // push the new note to the notes array
        saveNotes(notes);
        return note;
    }    
};

var getAll = () => {
    return fetchNotes();
};

var removeNote = (title) => {
    var notes = fetchNotes();  
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length !== notes.length;
};

var readNote = (title) => {
    var notes = fetchNotes();
    var targetNote = notes.filter((note) => note.title === title);
    return targetNote[0];
};

var logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote,
    logNote
};