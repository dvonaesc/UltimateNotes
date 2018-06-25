import AjaxUtil from './ajaxUtil.js';

class RestClient {

    constructor() {
        this.ajaxUtil = new AjaxUtil();
    }

    async addNewNote(note) {
        return await this.ajaxUtil.sendRequest(
            'POST',
            '/notes',
            note,
            {'Content-Type': 'application/json'}
        );
    }

    async loadAllNotes() {
        return await this.ajaxUtil.sendRequest(
            'GET',
            '/notes',
            undefined,
            {'Content-Type': 'application/json'}
        );
    }


    async getNote(id) {
        return await this.ajaxUtil.sendRequest(
            'GET',
            '/notes/' + id,
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

    async updateNote(note) {
        return await this.ajaxUtil.sendRequest(
            'PUT',
            '/notes/' + note._id,
            note,
            {'Content-Type': 'application/json'}
        );

    }
}

const restClient = new RestClient();
export default restClient;
