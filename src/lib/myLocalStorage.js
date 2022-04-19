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
    constructor() {
        this.saveHandler = this.create.bind(this);
        window.eventEmitter.on("save-to-storage", this.saveHandler);
        this.readHandler = this.getItem.bind(this);
        window.eventEmitter.on("read-from-storage", this.readHandler);
        this.clearHandler = this.clear.bind(this);
        window.eventEmitter.on("clear-storage", this.clearHandler);
    }

    dispose() {
        this.title = null;
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
        this.clear();
        const dataString = JSON.stringify(data);
        localStorage.setItem(this.title, dataString);
    }

    clear() {
        localStorage.removeItem(this.title);
    }

    /**
     * Read data from local storage
     * @param {string} key - key to read from local storage 
     * @returns 
     */
    getItem(key) {
        const rawData = localStorage.getItem(key);
        return JSON.parse(rawData) || [];
    }
}