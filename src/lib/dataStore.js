import {MyLocalStorage} from "./myLocalStorage";

class DataStore extends MyLocalStorage {

    get data() {
        if (this._data == null) {
            this._data = this.readAll();
        }

        return this._data;
    }

    set data(newValue) {
        this._data = newValue;
    }

    get idGenerator() {
        this.idGenerator = this._idGenerator == null ? 0 : this._idGenerator++;
        return this.idGenerator;
    }

    set idGenerator(newValue) {
        this._idGenerator = newValue;
    }


    constructor(title) {
        title == null ? console.warn("No title set for localStorage") : this.title = title;
    }

    create(record) {
        const id = this.idGenerator();
        record.id = id;
        const allRecords = this.data;
        allRecords.push(record);
        this.data = allRecords;
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
        const filteredRecord = this.data.filter(record => record.id === id);
        const excludedRecord = this.data.filter(record => record.id !== id);
        filteredRecord = newValue;
        excludedRecord.push(filteredRecord);
        this.data = excludedRecord;
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
        return MyLocalStorage.getItem(this.title);
    }

    _save() {
        MyLocalStorage.setItem(this.title, this.data);
    }
}