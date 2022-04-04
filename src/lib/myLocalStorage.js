import {EventEmitter} from '../lib/events.js';

export class MyLocalStorage {

    get title() {
        return this._title ?? "default";
    }

    set title(newValue) {
        this._title = newValue;
    }

    // get data() {
    //     return this._data ?? {};
    // }

    // set data(newValue) {
    //     this._data = newValue;
    // }

    /**
     * Accepts a title and dataLocation and save data to local storage
     * @param {string} title - title of local storage key 
     * @param {string} dataLocation - location of data to retrieve for storage
     */
    constructor(title, dataLocation) {
        title == null ? console.warn("No title set for localStorage") : this.title = title;
        this.dataLocation = dataLocation;
        window.eventEmitter = new EventEmitter;     //TODO: move this out and cleanup
        this.saveHandler = this._save.bind(this);
        window.eventEmitter.on("save-to-storage", this.saveHandler);
        this.readHandler = this._read.bind(this);
        window.eventEmitter.on("read-from-storage", this.readHandler);
        this.clearHandler = this._clear.bind(this);
        window.eventEmitter.on("clear-storage", this.clearHandler);
    }

    dispose() {
        this.title = null;
        this.data = null;
        window.eventEmitter.remove("clear-data", this.clearHandler);
        this.clearHandler = null;
        window.eventEmitter.remove("save-data", this.saveHandler);
        this.saveHandler = null;
        window.eventEmitter.remove("read-data", this.saveHandler);
        this.readHandler = null;
    }

    /**
     * Saves data to local storage
     */
    async _save() {
        localStorage.setItem(this.title, await this._getData());
        console.log("saved");
    }

    _read() {
        return localStorage.getItem(this.title);
    }

    /**
     * Retrieves data that is due to be saved 
     * @returns data
     */
    async _getData() {
        if (this.dataLocation == null) return;

        const response = await fetch(this.dataLocation);
        return await response.text();
    }

    _clear() {
        localStorage.removeItem(this.title);
    }

}