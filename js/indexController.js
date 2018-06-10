import {default as model} from './notesModel.js';

;(function ($) {

    function filterSelection(type) {
        switch (type) {
            case 'dueDate':
                model.sortNotes(model.SORT_BY_DUE_DATE);
            case 'creationDate':
                model.sortNotes(model.SORT_BY_CREATED_DATE);
            case 'priority':
                model.sortNotes(model.SORT_BY_PRIORITY);
        }
    }

    let notesTemplateProcessor = null;

    const notesModel = new model.NotesModel();

    function showNotes() {
        $("#todo").html(notesTemplateProcessor({notes: notesModel.getAllNotes() }));
    }

    $(function () {
        notesTemplateProcessor = Handlebars.compile($("#todo-template").html());

        showNotes();

    });

    window.onload = showNotes;
})(jQuery);

