
const storageKey = 'notes';

function loadAllNotes() {
    return JSON.parse(localStorage.getItem(storageKey))|| [];
}


function addNewNote(note) {
    const allNotes = this.loadAllNotes();
    note.id = Date.now();
    allNotes.push(note);
    this.save(allNotes);
}

function updateNote(note) {
    let allNotes = this.loadAllNotes();
    allNotes[note.id] = note;
    this.save(allNotes);
}

function save(notes) {
    localStorage.setItem(storageKey, JSON.stringify(notes));
}


export default { loadAllNotes,addNewNote,updateNote };