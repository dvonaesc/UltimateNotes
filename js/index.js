"use strict"

function loadAllNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function removeNote(id) {
    let items = JSON.parse(localStorage.getItem('notes'));
    items = items.filter(function (i) {
        return i.id != id
    });
    localStorage.setItem('notes', JSON.stringify(items));
    renderItems();
}

function filterSelection(type)
{
    switch (type) {
        case 'finish':
        case 'creation':
        case 'importance':
    }
}


function renderItems() {
    var createSongsHtml = Handlebars.compile(document.getElementById("todo-template").innerText);
    var items = loadAllNotes();
    document.getElementById("todo").innerHTML = createSongsHtml(items);
}

function addNewNote(note) {
    const allNotes = this.loadAllNotes();
    note.id = Date.now();
    allNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(allNotes));
}


window.onload = renderItems;
