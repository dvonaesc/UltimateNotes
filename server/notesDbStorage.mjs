import Datastore from 'nedb-promise'


export class NotesDbStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true})
    }

    async loadAllNotes() {

        return this.db.find({});
    }

    async get(id) {

        return await this.db.findOne({_id: id});
    }

    async updateNote(note) {
        return await this.db.update({_id: note._id}, note);
    }

    async addNewNote(note) {
        await this.db.insert(note);
    }
}

export const notesDbStore = new NotesDbStore();
