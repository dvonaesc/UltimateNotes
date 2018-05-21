class NotesModel{
    get dueDate() {
        return this._dueDate;
    }
    get importance() {
        return this._importance;
    }
    get detail() {
        return this._detail;
    }
    get title() {
        return this._title;
    }
     constructor(title,detail,importance,dueDate)
    {
        this._title = title;
        this._detail = detail;
        this._importance = importance;
        this._dueDate = dueDate;
    }
}

export default NotesModel;