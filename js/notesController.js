import {default as model} from './notesModel.js';
import Note from "./note.js";

;(function ($) {

/*    function filterSelection(type) {
        switch (type) {
            case 'dueDate':
                model.sortNotes(model.SORT_BY_DUE_DATE);
            case 'creationDate':
                model.sortNotes(model.SORT_BY_CREATED_DATE);
            case 'priority':
                model.sortNotes(model.SORT_BY_PRIORITY);
        }
    }*/


    let notesTemplateProcessor = null;
    let editTemplateProcessor = null;

    const notesModel = new model.NotesModel();

    function showNotes() {
        $("#content").html(notesTemplateProcessor({notes: notesModel.getAllNotes()}));
    }

    function showEdit() {
        $("#content").html(editTemplateProcessor({}));
    }

    $(function () {
        notesTemplateProcessor = Handlebars.compile($("#todo-template").html());
        editTemplateProcessor = Handlebars.compile($("#edit-template").html());

        $(document).on("click", "input[todo-item-id]", handleClick);



        function handleClick(event) {
            let elementId = event.target.id;
            let targetElement = event.target;
            const noteId = parseInt(targetElement.getAttribute('todo-item-id'));
            if (!isNaN(noteId)) {
                if (elementId === "editButton") {
                    showEdit();
                }
                if (elementId === "doneButton") {
                    notesModel.markAsComplete(noteId);
                    showNotes();
                }
            }
            if (elementId === "saveButton") {
                createNewNote();
                showNotes();
            }
            if (elementId === "cancelButton") {
                showNotes();
            }
        }

       function createNewNote()
        {
            const title = document.getElementById('title');
            const detail = document.getElementById('detail');
            const dueDate = document.getElementById('due-date');
            let newNote = new Note(title,detail,dueDate);
            notesModel.addNewNote(newNote);
        }


        $("#newNote").click(
            function () {
                showEdit();
            });


        showNotes();
    });

    window.onload = showNotes;
})(jQuery);

