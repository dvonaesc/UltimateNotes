import {notesDbStore} from './notesDbStorage'


export class NotesController {

    async getNotes(req, res) {
        res.json(( await notesDbStore.loadAllNotes()||[]))
    };

   async addNewNote(req, res) {
        res.json(await notesDbStore.addNewNote(req.body, req));
    };

    async getNote(req, res) {
        res.json((await notesDbStore.get(req.params.id)));
    };


    async updateNote(request, response) {
        response.json(
            await notesDbStore.updateNote(request.body)
        );
    }
}

export const notesController = new NotesController();