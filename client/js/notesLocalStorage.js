import Note from "./note.js";

const storageKey = 'notes';

function loadAllNotes() {
    let test = [];
    let newNote = new Note("title", "detail", Date.now(), 5);
    newNote._id = "12321";
    test.push(newNote);
    return test;
}


function addNewNote(note) {
    const allNotes =  this.loadAllNotes();
    note.id = allNotes.length;
    allNotes.push(note);
    save(allNotes);
}


function updateNote(note) {
    let allNotes = this.loadAllNotes();
    allNotes[note.id] = note;
    save(allNotes);
}

function save(note) {
    localStorage.setItem(storageKey, JSON.stringify(notes));
}


export default { loadAllNotes,addNewNote,updateNote };