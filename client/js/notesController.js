import {default as model} from './notesModel.js';
import Note from "./note.js";

;(function ($) {

    Handlebars.registerHelper ("setChecked", function (value, currentValue) {
        if ( value == currentValue ) {
            return "checked";
        } else {
            return "";
        }
    });

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    $(function () {

        let notesTemplateProcessor = null;
        let editTemplateProcessor = null;

        const notesModel = new model.NotesModel();

       async function showNotes() {
            $("#content").html(notesTemplateProcessor({notes: await notesModel.getAllNotes()}));
        }

        function showEdit(note) {
            $("#content").html(editTemplateProcessor({note}));
        }

        notesTemplateProcessor = Handlebars.compile($("#todo-template").html());
        editTemplateProcessor = Handlebars.compile($("#edit-template").html());

        $(document).on("click", "input[todo-item-id]", handleClick);
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
            const noteId = parseInt(targetElement.getAttribute('todo-item-id'));
            if (!isNaN(noteId)) {
                if (elementId === "editButton") {
                    let note = notesModel.getNote(noteId);
                    showEdit(note);
                }
                if (elementId === "doneButton") {
                    await notesModel.markAsComplete(noteId);
                    await showNotes();
                }
            }

        }



       async function saveNote()
        {
            const id = $("#noteEdit").attr("note-id");
            const title = $("#title").val();
            const detail = $("#detail").val();
            const dueDate = $("#due-date").val();
            const importance =  $("input:checked").val();
            let newNote = new Note(id,title,detail,dueDate,importance);
           await notesModel.addOrUpdateNote(newNote);
        }

        showNotes();
        window.onload = showNotes;
    });


})(jQuery);

