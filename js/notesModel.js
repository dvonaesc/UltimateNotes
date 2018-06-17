import {default as notesStorage} from './notesStorage.js';

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

    getAllNotes() {
        let notes = notesStorage.loadAllNotes();
        return this.sortNotes(notes, this.currentSort);
    }

    getNote(id) {
        let notes = notesStorage.loadAllNotes();
        return notes[id];
    }


    addOrUpdateNote(note) {
        if (!!note.id) {
            notesStorage.updateNote(note);
        }
        else
        {
            notesStorage.addNewNote(note);
        }
    }

    // function filterFinished(showFinished)
    // {
    //     if(showFinished)
    //     {
    //         this.notes = notesStorage.loadAllNotes();
    //     }
    //     else
    //     {
    //         this.notes = filterUnFinishedNotes(notesStorage.loadAllNotes());
    //     }
    // }

    // static filterUnFinishedNotes(notes) {
    //     return notes.filter((entry) => {
    //         return !entry.finished;
    //     });
    // }

    // updateNote(note)
    // {
    //     var notes = this.getAllNotes();
    //     notes[note.id] = note;
    //     notesStorage.updateNote(note);
    // }

    // function markAsComplete(notesId)
    //  {
    //    let note =  this.notes[notesId];
    //    note.finished = true;
    //    this.updateNote(note);
    //  }


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