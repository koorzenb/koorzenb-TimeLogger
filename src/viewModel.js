import {DataStore} from './lib/dataStore.js';
export class ViewModel {

    constructor() {
        console.log("viewModel started");
        const dataStore = new DataStore("toDoApp");
    }
}