class Note {
    constructor(id,title, detail, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.dueDate = dueDate;
        this.creationDate = Date.now();
        this.creationDate = Date.now();
        this.finished = false;
        this.priority = priority;
    }
}

export default Note;