class NotesStorage {

    static loadAllNotes() {
        return JSON.parse(localStorage.getItem('notes'));
    }

    static addNewNote(note) {
        const allNotes = this.loadAllNotes();
        allNotes.push(note)
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }

}

export default NotesStorage;