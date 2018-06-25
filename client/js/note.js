class Note {
    constructor(title, detail, dueDate, priority) {
        this.title = title;
        this.detail = detail;
        this.dueDate = dueDate;
        this.creationDate = Date.now();
        this.finished = false;
        this.priority = priority;
    }
}

export default Note;