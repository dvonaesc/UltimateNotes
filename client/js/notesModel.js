import {default as notesStorage} from './restClient.js';

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_CREATED_DATE = 'createdDate';
const SORT_BY_PRIORITY = 'priority';

class NotesModel {

    constructor() {
        this.currentSort = SORT_BY_PRIORITY;
    }

    setSortMode(mode) {
        this.currentSort = mode;
    }

   async getAllNotes() {
        let notes = await notesStorage.loadAllNotes();
        return this.sortNotes(notes, this.currentSort);
    }

    async getNote(id) {
        let notes = await notesStorage.loadAllNotes();
        return notes[id];
    }


    async addOrUpdateNote(note) {
        if (!!note.id) {
           await notesStorage.updateNote(note);
        }
        else {
           await notesStorage.addNewNote(note);
        }
    }


   async markAsComplete(notesId) {
        let notes = await notesStorage.loadAllNotes();
        let note = notes[notesId];
        note.finished = true;
       await notesStorage.updateNote(note);
    }


    sortNotes(notes, sortBy) {
        switch (sortBy) {
            case SORT_BY_DUE_DATE:
                return this.sortByDueDate(notes);
            case SORT_BY_CREATED_DATE:
                return this.sortByCreationDate(notes);
            case SORT_BY_PRIORITY:
                return this.sortByPriority(notes);
        }
    }

    sortByDueDate(notes) {
        return notes.sort((item1, item2) => {
            return new Date(item1.dueDate) - new Date(item2.dueDate);
        });
    }


    sortByPriority(notes) {
        return notes.sort((item1, item2) => {
            return item1.priority - item2.priority
        });
    }

    sortByCreationDate(notes) {
        return notes.sort((item1, item2) => {
            return new Date(item1.creationDate) - new Date(item2.dueDate);
        });
    }

}

export default {NotesModel, SORT_BY_DUE_DATE, SORT_BY_CREATED_DATE, SORT_BY_PRIORITY};