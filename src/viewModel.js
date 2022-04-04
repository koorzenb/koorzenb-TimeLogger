import {MyLocalStorage} from './lib/myLocalStorage.js';
export class ViewModel {

    constructor() {
        console.log("viewModel started");
        const myStorage = new MyLocalStorage("toDoList", "../data/entries.json");
    }
}