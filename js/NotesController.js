import NotesModel from './NotesModel';
import NotesStorage from './NotesStorage';

class NotesController{
    addNewNote()
    {
        let title = document.getElementById('title').value;
        let detail = document.getElementById('detail').value;
        //Todo get selected radio value
        let importance = document.getElementById('importance').value;
        let dueDate = document.getElementById('due-date').value;

        NotesStorage.addNewNote(new NotesModel.constructor(title, detail, importance,dueDate));
    }
}


export default NotesController;