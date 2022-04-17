import {DataStore} from './lib/dataStore.js';
import {registerEvent, unregisterEvents} from './utils/system-utils.js';
export class ViewModel {

    constructor() {
        console.log("viewModel started");
        const dataStore = new DataStore("toDoApp");
        this.addButton = document.getElementById("add-item");
        registerEvent(this.addButton, "click", this.addItem.bind(this));
    }

    dispose() {
        this.addButton = null;
        unregisterEvents(this.addButton, "click");
    }

    addItem() {
        event.preventDefault();
        const item = document.getElementById("item-input").value;
        const itemObj = {
            item: item,
            completed: false
        };
        window.eventEmitter.emit("create-record", itemObj);
    }
}