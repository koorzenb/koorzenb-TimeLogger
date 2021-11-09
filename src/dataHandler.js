import { Dates, DateType } from "./utils/enums.js";
import { DateTime } from "./utils/luxon.js";
import { FileIO } from "./fileIO.js";

export class DataHandler {

    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
        this.fileIO = new FileIO();
    }

    get entryDate() {
        const temp = formattedDate();
        // check for null
        // check for new date
        if (this._today == null) {
            this._today = temp;
        }

        return this._today !== temp ? temp : this._today;
    }

    add(a,b){
        return a + b;
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
            entry = this.fileIO.localStorage.filter(e => e.weekNumber === weekNumber) || this.initializeEmptyWeek();

            // this.removeEntryFromStorage(weekNumber);
        } else {
            const length = Object.keys(this.fileIO.localStorage).length
            let lastItem = length !== 0 ? this.fileIO.localStorage[length - 1] : {};  //TODO: Length == 0? lastItem == {} and contidition below falls ovr

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

    inflate(entry) {
        const id = `${this.dt.day}${this.dt.month}${this.dt.year}`
        return {entry, week: this.dt.weekNumber, id};

        // {
        //     "day": "Monday",
        //     "id": "04102021",
        //     "dt": "2021-10-04T09:25:30.433+02:00",
        //     "offsetDate": 4,
        //     "offset": -4
        // }
    }

    calculateHours(newValue) {
        let loggedTimes = this.fileIO.localStorage.loggedTimes ?? {};

        if (loggedTimes?.end != null || loggedTimes?.start == null || loggedTimes == null) {
            loggedTimes = {};
            loggedTimes.start = parseInt(newValue);
        } else if (loggedTimes?.start != null) {
            loggedTimes.end = parseInt(newValue);
            loggedTimes.difference = loggedTimes.end - loggedTimes.start;
            console.log("End time saved");
        }

        return loggedTimes;
    }
}