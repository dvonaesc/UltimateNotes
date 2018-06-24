import {notesDbStore} from './notesDbStorage'


export class NotesController {

    async getNotes(req, res) {
        console.log("NotesController get notes");
        var test = await notesDbStore.loadAllNotes();
        console.log("test: "+test);
        res.json(( await notesDbStore.loadAllNotes()||[]))
    };

   async addNewNote(req, res) {
       console.log("NotesController addNewNote");
        res.json(await notesDbStore.addNewNote(req.body, req));
    };

   async saveNotes(req, res) {
        res.json(await notesDbStore.save(req.body, req));
    };


   async updateNote(req, res) {
        res.json(await notesDbStore.updateNote(req.body, req));
    };
}

export const notesController = new NotesController();