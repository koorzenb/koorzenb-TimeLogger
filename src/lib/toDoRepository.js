import {create} from "browser-sync";

class TodoRepository {
    /**
     * Action after "+"
     */

    get data() {
        if (this._data == null) {
            this._data == this.readAll();
        }

        return data;
    }

    set data(newValue) {
        this._data = newValue;
    }

    constructor(dataLocation) {
        this.dataLocation = dataLocation;
    }

    create() {
        // loadComponent("list-item", "ul")
        // data.records.set(++id, inputvalue)
        // emit("changed")

        /**
         * v2
         * 
         * if no file, create data/entries.json with array as content
         */

        try {
            await fetch(this.dataLocation);
        } catch (e) {
            console.warn("no data store - created new");
            //TODO: create new file - cannot us fs. since node doesnt run on mobile
        }
    }

    /**
     * Action after "enter"
     */
    update() {
        // - get input 
        // - on keydown/enter
        // <!-- - data.records = new Map() -->
        // - data.records.get()
        // - data.records.set(checkbox.id, inputValue) 
        // - emit "changed"

        /**
         * v2
         * readAll - if  no  array, create empty array adn append first item
         * if existing array, createRecord and push item 
         */
    }

    readById() {
        // readAll and filter by Id
    }

    getLastRecord() {
        // readlAll and return as this.lastRecordId
    }

    /**
     * 
     * @returns Fetch all data from file
     */
    readAll() {
        if (this.dataLocation == null) return;

        const response = await fetch(this.dataLocation);
        this.data = await response.text();
    }

    deleteById(id) {

    }

    createRecord() {
        // inflate and return record with id, description and date
        // what is value of last id in array? Or use getLastRecord and then this.lastRecord++ for future use
    }

}