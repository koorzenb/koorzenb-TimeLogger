import { Dates, DateType } from "./utils/enums.js";
import { DateTime, Duration } from "./utils/luxon.js";
import { LoggerRepository } from "./loggerRepository.js";

export class DataHandler {
    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
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

        if (weekNumber != null) {
            entry =
              this.loggerRepository.storage.filter(
                (e) => e.weekNumber === weekNumber
              ) || this.initializeEmptyWeek();

            // this.removeEntryFromStorage(weekNumber);
        } else {
            //TODO: storage should be managed from elsewhere
            const length = 1; // Object.keys(this.loggerRepository.storage).length
            let lastItem = 1; // length !== 0 ? this.loggerRepository.storage[length - 1] : {};  //TODO: Length == 0? lastItem == {} and contidition below falls ovr

            // remove these 3 lines. Is handled by showEntries()
            if (lastItem == null || lastItem.weekNumber != thisWeek) {
                lastItem = this.initializeEmptyWeek();
            }
            entry = lastItem;
        }

        //thisWeek == null, meaning now new records for this week

        return entry;
    }

    getStartTime() {
        //waits on submission from input
        //must be number
        //save to localStorage
    }

    getEndTime() {
    }

    /**
     * Assigns input to either starting or ending time.
     * If _startTime is empty, assigns incoming parameter to _startTime. Else assigns to  _endTime.
     * @param {string} inflatedValue
     * @returns
     */
    assignInput(inflatedValue) {
        if (this._startTime != null && this._endTime != null) console.error("Prevous input did not clear");

        if (this._startTime == null) {
            this._startTime = inflatedValue;
            return false;
        }
        if (this._endTime == null) {
            this._endTime = inflatedValue;
            return true; //meaning, both entries have been populated
        }
    }


    /**
     * Assign record to a week and insert into loggedTimes and save to localStorage
     * @param {obj} record
     */
    assignRecord(record) {
        const loggedTimes = [record];
        //TODO: check for weekNumber if id exist on loggedTimes

        return {
            weekNumber: this._startTime.dt.weekData.weekNumber,
            loggedTimes
        };
    }

    /**
     * Calculcates the difference in time in milliseconds
     * @param {DateTime} startValue
     * @param {DateTime} endValue
     * @returns
     */
    calculateHours(startValue, endValue) {
        const diff = endValue.diff(startValue, ["hours", "minutes"]);
        return diff;
    }

    /**
     * Dispose session's values of start and end times
     */
    clearEntries() {
        delete this._startTime;
        delete this._endTime;
    }

    /**
     * Create datasturcture of record to insert into template
     * @returns {{id: `{number} id used by HTML`, day: "{string} name of weekday", startTime: number, endTime: number}}
     */
    createRecord(calenderDate, weekday, id) {
        let difference, minutes, stringValue;
        if (this._startTime != 0) {
            difference = this.calculateHours(this._startTime.dt, this._endTime.dt);
            minutes = Number.parseInt(difference.minutes) < 10 ? `0${difference.minutes}` : difference.minutes;
            stringValue = `${difference.hours}:${minutes}`;
        } else {
            stringValue = "Nothing logged"
        }
        return {
            calenderDate,
            day: weekday || this._startTime.dt.weekdayLong,
            difference,
            endTime: this._endTime.inputValue ?? "",
            id: id || this._startTime.id,
            startTime: this._startTime.inputValue ?? "",
            stringValue
        };
    }

    getWeekStartDateFromWeekNumber(weekNumber) {
        const yearNumber = DateTime.now().year;
        weekNumber = weekNumber || DateTime.now().weekNumber;
        const dt = DateTime.fromObject({
            weekYear: yearNumber,
            weekNumber
        });
        return { startingDate: dt.startOf("week").c.day, dt };
    }

    /**
     * Creates an obj with an id off input value. Also adds dt
     * @param {string} inputValue - value received from form inpt
     * @returns {obj}
     */
    inflate(inputValue, id) {
        if (id == null) id = `${this.dt.day}${this.dt.month}${this.dt.year}`;

        let newDt = null;
        if (inputValue != null) {
            const timeParts = inputValue.split(":");
            newDt = DateTime.fromObject({ hour: timeParts[0], minutes: timeParts[1] });
        }
        return { dt: newDt, id, inputValue };
    }

    initializeEmptyWeek() {
        //TODO: pass weekNumber to initialize //TODO: might be duplication of inflate()
        const enumDate = new Dates();
        const startDate = this.getWeekStartDateFromWeekNumber();
        // const offset = this.dt.weekday - 1; // days to substract so we start calc from Monday
        let entry;
        const loggedTimes = [];
        this.assignInput(0); //assigning start value
        this.assignInput(0); //assigning end value

        let count = 0;
        for (const day of DateType.WEEKDAY) {
            // const localOffset = count - offset;
            // change line below to start with startDate and to pus.count
            const nextDate = startDate.dt.plus({ day: count });
            const calendarDate = nextDate.day; // todayDate - offset - count
            const paddedDate =
              calendarDate < 10 ? `0${calendarDate}` : calendarDate;

            const weekday = `${enumDate.get( //demonstarting Enums
              DateType.WEEKDAY,
              DateType.WEEKDAY.indexOf(day)
            )}`;
            const id = `${paddedDate}${nextDate.month}${nextDate.year}`;
            const item = this.createRecord(
              calendarDate, weekday, id
            );
            loggedTimes.push(item);
            count++;
        }

        entry = {
            weekNumber: this.dt.weekNumber,
            loggedTimes
        };

        //TODO: this.saveToLocalStorage(entry);
        return entry;
    }
}
