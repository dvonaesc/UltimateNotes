import {default as notesModel} from 'notesModel.js';

 function addNewNote(note) {
     notesModel.addNewNote(note);
}

function init()
{
    const title = document.getElementById('title');
    const detail = document.getElementById('detail');
    const dueDate = document.getElementById('due-date');

    const saveButton = document.getElementById('save-button');

    saveButton.onclick = function () {
        let newNote = {  'title': title.value, 'detail': detail.value, 'dueDate': dueDate.value,  'done': false, 'created': Date.now().toLocaleString() };
        addNewNote(newNote);
        window.location.href="index.html";
    };
}

window.onload = init;

