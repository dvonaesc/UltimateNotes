class Note {
    constructor(id, title, detail,creationDate, dueDate,priority) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
        this.finished = false;
        this.priority = priority;
    }
}

export default Note;