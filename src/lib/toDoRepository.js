// import {path} from "path";
// import {fs} from "fs";

export class ToDoRepository {
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

    constructor(dataLocation, fileName) {
        this.dataLocation = dataLocation;
        // this.create(dataLocation, fileName);
    }

    async create(dataLocation = "../../data", fileName = "./entries.js") {
        const saveFile = path.resolve(__dirname, `${dir}/${fileName}`);

        try {
            await fetch(saveFile);
            return;
        } catch (e) {
            console.warn("no data store - created new");
            if (fs.existsSync(saveFile) === false) {
                const json = [];
                const output = JSON.stringify(json, null, 4);
                fs.writeFileSync(saveFile, output, "utf-8");
            }
            //TODO: create new file - cannot us fs. since node doesnt run on mobile
            const dir = path.resolve(__dirname, dataLocation);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
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
    async readAll() {
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