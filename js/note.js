class Note {
    constructor(title, detail, dueDate, priority) {
        this.id = Date.now().toPrecision();
        this.title = title;
        this.detail = detail;
        this.dueDate = dueDate;
        this.creationDate = Date.now().toLocaleString();
        this.finished = false;
        this.priority = priority;
    }
}

export default Note;