import { registerEvent, unregisterEvents } from "./utils/system-utils.js";
import { DataHandler } from "./dataHandler.js";
export class ViewModel {

    constructor() {
        document.addEventListener('DOMContentLoaded', this.initHandler);
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(addButton, "click");
        delete this.clickHandler;
        delete this.itemTemplate;
        delete this.formInput;
        delete this.itemsList;
        delete this._today;
        delete this.id;
        delete this.localStorage;
        delete this.fragment;
        delete this.dt;
        delete this.dataHandler;
    }


}
