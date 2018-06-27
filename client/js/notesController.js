import {default as model} from './notesModel.js';
import Note from "./note.js";


(function ($) {

    $(function () {

        let notesTemplateProcessor = null;
        let editTemplateProcessor = null;
        let filterTemplateProcessor = null;
        const notesModel = new model.NotesModel();

        async function showNotes() {
            $("#content").html(notesTemplateProcessor({notes: await notesModel.getAllNotes()}));
            $("#filterButtonContainer").html(filterTemplateProcessor({model: notesModel}));

        }

        function showEdit(note) {
            $("#content").html(editTemplateProcessor({note}));
        }

        notesTemplateProcessor = Handlebars.compile($("#todo-template").html());
        editTemplateProcessor = Handlebars.compile($("#edit-template").html());
        filterTemplateProcessor = Handlebars.compile($("#filter-template").html());

        $(document).on("click", "button[todo-item-id]", handleClick);
        $(document).on("click", "input", handleFilterClick);
        $(document).on("click", "button", handleButtonClick);

        async function handleButtonClick(event) {
            let elementId = event.target.id;

            if (elementId === "newNote") {
                showEdit(new Note());
            }
            if (elementId === "saveButton") {
                await saveNote();
                await showNotes();
            }
            if (elementId === "cancelButton") {
                await showNotes();
            }

            if (elementId === "filterOutFinishedOn" || elementId === "filterOutFinishedOff") {
                notesModel.setFilterOutFinished();
                await showNotes();
            }
        }

        async function handleFilterClick(event) {
            let elementId = event.target.id;

            if (elementId === "filterByCreation") {
                notesModel.setSortMode(model.SORT_BY_CREATED_DATE);
                await showNotes();
            }
            if (elementId === "filterByImportance") {
                notesModel.setSortMode(model.SORT_BY_PRIORITY);
                await showNotes();
            }
            if (elementId === "filterByFinish") {
                notesModel.setSortMode(model.SORT_BY_DUE_DATE);
                await showNotes();
            }
            if (elementId === "newNote") {
                showEdit(new Note());
            }
            if (elementId === "saveButton") {
                await saveNote();
                await showNotes();
            }
            if (elementId === "cancelButton") {
                await showNotes();
            }
        }

        async function handleClick(event) {
            let elementId = event.target.id;
            let targetElement = event.target;
            const noteId = targetElement.getAttribute('todo-item-id');
            if (elementId === "editButton") {
                    let note = await notesModel.getNote(noteId);
                showEdit(note);
            }
            if (elementId === "doneButton") {
                    await notesModel.markAsComplete(noteId);
                await showNotes();
            }
        }


        async function saveNote() {
            const title = $("#title").val();
            const detail = $("#detail").val();
            const dueDate = $("#due-date").val();
            const importance = $("input:checked").val();
            let newNote = new Note(title, detail, dueDate, importance);
            const id = $("#noteEdit").attr("note-id");
            console.log("save note id:" + id);
            if (id !== "") {
                newNote._id = id;
            }
           await notesModel.addOrUpdateNote(newNote);
        }

        showNotes();
        window.onload = showNotes;
    });


})(jQuery);

