import {ToDoRepository} from "./toDoRepository";

class ToDoService {

    get data() {
        return this._data = toDoRepository;
    }

    set data(newValue) {
        this._data.set(newValue.id, newValue.value);
    }

    constructor() {
        this._data = toDoRepository;
    }

}