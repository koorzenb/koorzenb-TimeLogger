import {Dates, DateType} from "./utils/enums.js";
import {DateTime} from "./utils/luxon.js";
// import {FileIO} from "./fileIO.js";

export class DataHandler {

    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
        this.createDailyEntry();
        // this.fileIO = new FileIO();
    }

    /**
     * Creates an entry
     * @param input {{description: string, dt: dt}}
     */
    createDailyEntry(input) {



        // const date = this.getWeekStartDate(5);
        // return this.dt;


        /**
         * Properties
         * - id - function of date/dt
         * - dt
         *      - weekNumber
         *      - weekdayLong
         * - _startTime
         * - _endTime
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

    /**
     * For given weeknumber, calculcate the starting date
     * @param {number} weekNumber - week number to calculcate starting date from
     * @returns 
     */
    getWeekStartDate(weekNumber) {
        const yearNumber = DateTime.now().year;
        weekNumber = weekNumber || DateTime.now().weekNumber;
        const dt = DateTime.fromObject({
            weekYear: yearNumber,
            weekNumber
        });
        return {startingDate: dt.startOf("week").c.day, dt};
    }
}