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

    $(document).on("click", "input[todo-item-id]", handleEditNoteClick);
    $(document).on("click", "input[todo-item-id]", handleDoneNoteClick);


    function handleEditNoteClick(event) {
        let target = $(event.target);
        let foodId = Number(target.data("food-id"));

        if (!isNaN(foodId)) {
            target.prop("disabled", true);
            foodService.orderFoodById(foodId, function () {
                showFood();
                target.prop("disabled", false);
            });
        }
    }

    function handleDoneNoteClick(event) {
        let target = $(event.target);
        let foodId = Number(target.data("food-id"));

        if (!isNaN(foodId)) {
            target.prop("disabled", true);
            foodService.orderFoodById(foodId, function () {
                showFood();
                target.prop("disabled", false);
            });
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

