import Datastore from 'nedb-promise'


export class NotesDbStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true})
    }

    async loadAllNotes() {
        console.log("notes db store load all notes");
        console.log("db: "+this.db);
        return this.db.find({});
    }

    async save(notes) {
        await this.db.insert(notes);
    }

    async updateNote(note) {
        let allNotes = await this.loadAllNotes();
        allNotes[note.id] = note;
        await this.save(allNotes);
    }

    async addNewNote(note) {
        const allNotes = await this.loadAllNotes();
        note.id = allNotes.length;
        allNotes.push(note);
        console.log("notes db addNewNote: "+note);
        await this.save(allNotes);
    }
}

export const notesDbStore = new NotesDbStore();
