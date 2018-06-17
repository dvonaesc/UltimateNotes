
const storageKey = 'notes';

function loadAllNotes() {
    return JSON.parse(localStorage.getItem(storageKey))|| [];
}


function addNewNote(note) {
    const allNotes = this.loadAllNotes();
    note.id = allNotes.length;
    allNotes.push(note);
    save(allNotes);
}


function updateNote(note) {
    let allNotes = this.loadAllNotes();
    allNotes[note.id] = note;
    save(allNotes);
}

function save(notes) {
    localStorage.setItem(storageKey, JSON.stringify(notes));
}


export default { loadAllNotes,addNewNote,updateNote };