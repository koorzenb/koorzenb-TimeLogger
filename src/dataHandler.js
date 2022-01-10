import { Dates, DateType } from "./utils/enums.js";
import { DateTime } from "./utils/luxon.js";
import { FileIO } from "./fileIO.js";

export class DataHandler {

    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
        this.fileIO = new FileIO();
    }

    /**
     * Creates an entry
     * @param input {{description: string, dt: dt}}
     */
    createDailyEntry(input) {


        /**
         * Properties
         * - id - function of date/dt
         * - dt
         *      - weekNumber
         *      - weekdayLong
         * - date string? No, can extrapolate from dt
         * - description
         * - difference
         */

        // send off to saveToLocal
    }

    /**
     * Get by id and return object
     * @param {string} id 
     * @returns {object} entry details
     */
    readDailyEntry(id) {
        return {};
    }

    /**
     * Get by id, modifies entry and return updated object
     * @param {string} id 
     * @returns {object} updated entry
     */
    updateDailyEntry(id) {
        return {};
    }

    /**
     * Gets by id and delete
     * @param {string} id 
     */
    deleteDailyEntry(id) { }
}