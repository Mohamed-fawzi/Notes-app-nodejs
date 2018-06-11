const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes');
const yargs = require('yargs');

var titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
var bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};
const argv = yargs
.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', "List all notes")
.command('read', 'Read a note', {
    title: titleOptions
})
.command('remove', 'Remove a note',{
    title: titleOptions
})
.argv; 
var command = argv._[0];

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log("Note created!");
        notes.logNote(note);
    }else{
        console.log("Note title is taken!");
    }
}else if (command === 'remove'){ 
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed!' : 'Note not found!';
    console.log(message);
    
}else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
}else if (command === 'read'){
    var note = notes.readNote(argv.title);
    if(note){ 
        console.log("Note found!");
        notes.logNote(note);
    }else{
        console.log("Note not found!");
    }
}else{
    console.log('Wrong entry, Command not recognized');
}