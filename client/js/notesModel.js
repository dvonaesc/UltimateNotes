import {default as notesStorage} from './restClient.js';

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_CREATED_DATE = 'createdDate';
const SORT_BY_PRIORITY = 'priority';

class NotesModel {

    constructor() {
        this.currentSort = SORT_BY_PRIORITY;
        this.filterOutFinished = false;
    }

    setSortMode(mode) {
        this.currentSort = mode;
    }

    setFilterOutFinished() {
        if (this.filterOutFinished) {
            this.filterOutFinished = false;
        }
        else {
            this.filterOutFinished = true;
        }
    }

   async getAllNotes() {
        let notes = await notesStorage.loadAllNotes();
       return this.sortNotes(notes, this.currentSort, this.filterOutFinished);
    }

    async getNote(id) {

        return await notesStorage.getNote(id);
    }


    async addOrUpdateNote(note) {
        if (!!note._id) {
           await notesStorage.updateNote(note);
        }
        else {
           await notesStorage.addNewNote(note);
        }
    }


   async markAsComplete(notesId) {
       let note = await notesStorage.getNote(notesId);
        note.finished = true;
       await notesStorage.updateNote(note);
    }


    sortNotes(notes, sortBy, filterOutFinished) {
        if (filterOutFinished) {
            notes = notes.filter(x => !x.finished);
        }
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
            return item2.priority - item1.priority
        });
    }

    sortByCreationDate(notes) {
        return notes.sort((item1, item2) => {
            return new Date(item1.creationDate) - new Date(item2.dueDate);
        });
    }

}

export default {NotesModel, SORT_BY_DUE_DATE, SORT_BY_CREATED_DATE, SORT_BY_PRIORITY};