import {default as notesStorage} from './notesStorage.js';

const SORT_BY_DUE_DATE = 'dueDate';
const SORT_BY_CREATED_DATE = 'createdDate';
const SORT_BY_PRIORITY = 'priority';

class NotesModel{

    constructor()
    {
        this.notes = notesStorage.loadAllNotes();
        this.currentSort = SORT_BY_PRIORITY;
        this.sortNotes(this.currentSort);
    }

     getAllNotes()
    {
        this.sortNotes(this.currentSort);
        return this.notes;
    }

    addNewNote(note)
    {
        this.notes.push(note);
        notesStorage.addNewNote(note);
    }

    filterFinished(showFinished)
    {
        if(showFinished)
        {
            this.notes = notesStorage.loadAllNotes();
        }
        else
        {
            this.notes = filterUnFinishedNotes(notesStorage.loadAllNotes());
        }
    }

    static filterUnFinishedNotes(notes) {
        return notes.filter((entry) => {
            return !entry.finished;
        });
    }

    updateNote(note)
    {
        this.notes[note.id] = note;
        notesStorage.updateNote(note);
    }

    markAsComplete(notesId)
    {
      let note =  this.notes[notesId];
      note.finished = true;
      this.updateNote(note);
    }


     sortNotes(sortBy) {
        switch (sortBy) {
            case SORT_BY_DUE_DATE:
                this.sortByDueDate();
            case SORT_BY_CREATED_DATE:
                this.sortByCreationDate();
            case SORT_BY_PRIORITY:
                this.sortByPriority();
        }
    }

     sortByDueDate() {
        this.notes.sort((item1, item2) => {
            return new Date(item1.dueDate) - new Date(item2.dueDate);
        });
    }


    sortByPriority() {
        this.notes.sort((item1, item2) => {
            return item1.priority - item2.priority
        });
    }

    sortByCreationDate() {
        this.notes.sort((item1, item2) => {
            return new Date(item1.creationDate) - new Date(item2.dueDate);
        });
    }

}

export default {NotesModel,SORT_BY_DUE_DATE,SORT_BY_CREATED_DATE,SORT_BY_PRIORITY};