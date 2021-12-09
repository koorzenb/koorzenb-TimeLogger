import { Dates, DateType } from "./utils/enums.js";
import { DateTime } from "./utils/luxon.js";
import { LoggerRepository } from "./loggerRepository.js";

export class DataHandler {

    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
        this.loggerRepository = new LoggerRepository("timeLoggerData");
    }

    get getTodayDate() {
        const temp = formattedDate();
        // check for null
        // check for new date
        if (this._today == null) {
            this._today = temp;
        }

        return this._today !== temp ? temp : this._today;
    }

     /**
     * @param weekNumber {number} - week number for entry to retrieve
     * @returns {Object} - list of entries for specified week number
     */
      getEntry(weekNumber) {
        const thisWeek = this.dt.weekNumber;
        const loggedTimes = [];
        let entry;

        if(weekNumber != null) {            
            entry = this.loggerRepository.storage.filter(e => e.weekNumber === weekNumber) || this.initializeEmptyWeek();

            // this.removeEntryFromStorage(weekNumber);
        } else {
            const length = Object.keys(this.loggerRepository.storage).length
            let lastItem = length !== 0 ? this.loggerRepository.storage[length - 1] : {};  //TODO: Length == 0? lastItem == {} and contidition below falls ovr

            // remove these 3 lines. Is handled by showEntries()
            if (lastItem == null || lastItem.weekNumber != thisWeek) {
                lastItem = this.initializeEmptyWeek();
            }
            entry = lastItem;
        }

        //thisWeek == null, meaning now new records for this week

        return entry;
    }

    initializeEmptyWeek() {     //TODO: pass weekNumber to initialize //TODO: might be duplication of inflate()
        const enumDate = new Dates();

        const offset = this.dt.weekday - 1;   // days to substract so we start calc from Monday        
        let entry;
        const loggedTimes = [];

        let count = 0;
        for (const day of DateType.WEEKDAY) {
            const localOffset = count - offset
            const calendarDate = this.dt.plus({day : localOffset }).day;  // todayDate - offset - count
            const paddedDate = calendarDate < 10 ? `0${calendarDate}` :  calendarDate;
            const item = {
                day: `${enumDate.get(DateType.WEEKDAY, DateType.WEEKDAY.indexOf(day))}`,
                id: `${paddedDate}${this.dt.month}${this.dt.year}`,
                dt: DateTime.now().plus({day: localOffset}),
                calendarDate,
                offset: localOffset
            }
            loggedTimes.push(item);
            count++;
        }

        entry = {
            weekNumber: this.dt.weekNumber,
            loggedTimes
        }

        //TODO: this.saveToLocalStorage(entry);
        return entry;

    }

    getStartTime() {
        //waits on submission from input
        //must be number
        //save to localStorage
    }

    getEndTime() {

    }

    assignEntry(input) {
        if (this._startTime == null) {
            this._startTime = input;
            return false;
        };
        if (this._endTime == null) {
            this._endTime = input;
            return true;    //meaning, both entries have been populated
        };
    }

    createRecord() {
        return {
            weekNumber: this._startTime.dt.weekData.weekNumber,
            id: this._startTime.id,
            loggedTimes: [
                day: this._startTime.dt.
            ]

        }
    }

    clearEntries() {
        delete this._startTime;
        delete this._endTime;
    }

    inflate(inputValue) {
        const id = `${this.dt.day}${this.dt.month}${this.dt.year}`;
        return {inputValue, dt: this.dt, id};
    }

    /**
     * Calculcates the difference in time in milliseconds
     * @param {DateTime} startValue 
     * @param {DateTime} endValue 
     * @returns 
     */
    calculateHours(startValue, endValue) {
        return endValue.diff(startValue)
    }
}