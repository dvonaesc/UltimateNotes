import {default as model} from './notesModel.js';
import Note from "./note.js";

;(function ($) {



    $(function () {

        let notesTemplateProcessor = null;
        let editTemplateProcessor = null;

        const notesModel = new model.NotesModel();

        function showNotes() {
            $("#content").html(notesTemplateProcessor({notes: notesModel.getAllNotes()}));
        }

        function showEdit(note) {
            $("#content").html(editTemplateProcessor({note}));
        }

        notesTemplateProcessor = Handlebars.compile($("#todo-template").html());
        editTemplateProcessor = Handlebars.compile($("#edit-template").html());

        $(document).on("click", "input[todo-item-id]", handleClick);
        $(document).on("click", "input", handleFilterClick);

        function handleFilterClick(event) {
            let elementId = event.target.id;

            if (elementId === "filterByCreation") {
                notesModel.setSortMode(model.SORT_BY_CREATED_DATE);
                showNotes();
            }
            if (elementId === "filterByImportance") {
                notesModel.setSortMode(model.SORT_BY_PRIORITY);
                showNotes();
            }
            if (elementId === "filterByFinish") {
                notesModel.setSortMode(model.SORT_BY_DUE_DATE);
                showNotes();
            }
            if (elementId === "newNote") {
                showEdit(new Note());
            }
            if (elementId === "saveButton") {
                saveNote();
                showNotes();
            }
            if (elementId === "cancelButton") {
                showNotes();
            }
        }

        function handleClick(event) {
            let elementId = event.target.id;
            let targetElement = event.target;
            const noteId = parseInt(targetElement.getAttribute('todo-item-id'));
            if (!isNaN(noteId)) {
                if (elementId === "editButton") {
                    let note = notesModel.getNote(noteId);
                    showEdit(note);
                }
                if (elementId === "doneButton") {
                    //notesModel.markAsComplete(noteId);
                    showNotes();
                }
            }

        }

       function saveNote()
        {
            const id = $("#noteEdit").attr("note-id");
            const title = $("#title").val();
            const detail = $("#detail").val();
            const dueDate = $("#due-date").val();
            let newNote = new Note(id,title,detail,dueDate);
            notesModel.addOrUpdateNote(newNote);
        }

        showNotes();
        window.onload = showNotes;
    });


})(jQuery);

