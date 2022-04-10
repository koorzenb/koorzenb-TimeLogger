import {EventEmitter} from '../lib/events.js';

export class MyLocalStorage {

    get title() {
        return this._title ?? "default";
    }

    set title(newValue) {
        this._title = newValue;
    }

    // get allRecords() {
    //     return this._data ?? {};
    // }

    // set allRecords(newValue) {
    //     this._data = newValue;
    // }

    /**
     * Accepts a title and dataLocation and save data to local storage
     * @param {string} title - title of local storage key 
     * @param {string} dataLocation - location of data to retrieve for storage
     */
    constructor(title, dataLocation) {
        title == null ? console.warn("No title set for localStorage") : this.title = title;
        window.eventEmitter = new EventEmitter;     //TODO: move this out and cleanup
        this.saveHandler = this.create.bind(this);
        window.eventEmitter.on("save-to-storage", this.saveHandler);
        this.readHandler = this.readAll.bind(this);
        window.eventEmitter.on("read-from-storage", this.readHandler);
        this.clearHandler = this.clear.bind(this);
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
    async create(data) {
        localStorage.setItem(this.title, data);
        console.log("saved");
    }

    clear() {
        localStorage.removeItem(this.title);
    }

    /**
     * ReadAll and filter by Id
     * @param {number} id - id of record to read 
     * @returns {object} - record
     */
    readById(id) {
        const allRecords = this.readAll();
        const filteredRecords = allRecords.filter(record => record.id === id);
        return filteredRecords;
    }

    updateById(id, newValue) {
        const allRecords = this.readAll();
        const filteredRecords = allRecords.filter(record => record.id === id);
        filteredRecords.description = newValue;
        this.create(filteredRecords);
    }

    deleteById(id) {
        const allRecords = this.readAll();
        const filteredRecords = allRecords.filter(record => record.id !== id);
        this.create(filteredRecords);
    }

    /**
     * 
     * @returns Fetch all data from local storage
     */
    readAll() {
        return localStorage.getItem(this.title);
    }
}