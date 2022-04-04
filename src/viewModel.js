import {ToDoRepository} from './lib/toDoRepository.js';
export class ViewModel {

    constructor() {
        console.log("viewModel started");
        const repo = new ToDoRepository();
    }
}