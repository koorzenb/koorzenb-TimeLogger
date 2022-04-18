import {MyLocalStorage} from "./myLocalStorage.js";
export class DataStore {

    get data() {

        if (this._data == null) {
            this._data = this._readAll();
        }

        return this._data;
    }

    set data(newValue) {
        this._data = newValue;
    }

    get idGenerator() {
        if (this._id == null) {
            this._id = 0;
        }
        this._id++;
        return this._id;
    }

    set idGenerator(newValue) {
        this._idGenerator = newValue;
    }

    constructor(title) {
        title == null ? console.warn("No title set for localStorage") : this.title = title;
        this.localStorage = new MyLocalStorage();
        this.localStorage.title = title;
        this.updateByIdHandler = this._updateById.bind(this);
        window.eventEmitter.on("update-by-id", this.updateByIdHandler);
        this.createHandler = this._create.bind(this);
        window.eventEmitter.on("create-record", this.createHandler);
    }

    dispose() {
        this.title = null;
        this.data = null;
        this.idGenerator = null;
    }

    _create(record) {
        record.id = this.idGenerator;
        const allRecords = this.data;
        allRecords.push(record);
        this.data = allRecords;
        this.save();
        console.info(`Created record with id = ${record.id}`);
        window.eventEmitter.emit("updated-data");
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

    _updateById(id, newValue) {
        const filteredRecord = this.data.filter(record => record.id === id);
        const excludedRecord = this.data.filter(record => record.id !== id);
        filteredRecord = newValue;
        excludedRecord.push(filteredRecord);
        this.data = excludedRecord;
        this.save();
    }

    deleteById(id) {
        const excludedRecord = this.data.filter(record => record.id !== id);
        this.data = excludedRecord;
    }

    /**
     * 
     * @returns Fetch all data from local storage
     */
    _readAll() {
        return this.localStorage.getItem(this.title);
    }

    save() {
        window.eventEmitter.emit("save-to-storage", this.data);
    }
}