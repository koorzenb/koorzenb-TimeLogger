import { DataHandler } from "../src/dataHandler.js";
import { DateTime } from "../src/utils/luxon.JS";

describe("DataHandler tests", () => {

    let dataHandler;
    let dateTime;

    beforeAll(() => {
        dateTime = new DateTime({});
    });

    beforeEach(() => {
        dataHandler = new DataHandler;

        dataHandler._startTime = {
            dt: {
                c: {
                    year: 2021,
                    hour: 17
                },
                weekData:
                {
                    weekNumber: 49
                },
                weekdayLong: "Thursday",
                isLuxonDateTime: true
            },
            inputValue: "8.15"
        };

        dataHandler._startTime2 = DateTime.fromObject({ hour: 8 });

        dataHandler._endTime = {
            dt: {},
            inputValue: "17"
        };

        dataHandler._endTime2 = DateTime.fromObject({ hour: 17 });

        dataHandler.entries = new Map();
        dataHandler.entries.set(09122021, {

        });
    });

    afterEach(() => {
        dataHandler == null;
    });

    afterAll(() => {
        dataHandler = null;
        dateTime = null;
    });

    test("empty getEntry", () => {


    });

    test('assignInput', () => {
        const _tempStart = dataHandler._startTime;
        dataHandler._startTime = null;
        const _tempEnd = dataHandler._endTime;
        dataHandler._endTime = null;

        let done = dataHandler.assignInput(_tempStart);
        expect(done).toEqual(false);

        done = dataHandler.assignInput(_tempEnd);
        expect(done).toEqual(true);
    });

    test('assignRecord', () => {
        // {
        //     weekNumber: x,
        //     loggedTimes: [
        //         {
        //             day: Sunday,
        //             id: 12112021,
        //             dateTimeObj: dt,
        //             calendarDate: 21,
        //             offset: currentDayNumberOfTheWeek - thisDayNumberOfTheWeek,
        //             startTime: 8,
        //             endTime: 17
        //
        //         }, 
        //         {
        //             day: Monday,
        //             // ...
        //         }
        //     ]
        // }

        const record = dataHandler.assignRecord();
        expect(record.weekNumber).toEqual(49);
        expect(Array.isArray(record.loggedTimes)).toBe(true);
        expect(record.loggedTimes).not.toEqual(null);
    });

    test('calcHours - Expect to return difference between start and end times ', () => {
        const start = DateTime.fromObject({ hour: 15 });
        const end = start.plus({ hours: 1, minutes: 1 });
        const diff = end.diff(start);
        expect(diff.values.milliseconds).toEqual(3660000);

        const callDiff = dataHandler.calculateHours(start, end).toString();
        expect(callDiff).toMatch("PT1H1M");
    });


    test('getWeekStartDateFromWeekNumber', () => {
        const returnDate = dataHandler.getWeekStartDateFromWeekNumber();
        expect(returnDate.startingDate <= 31).toBe(true);
    });

    test('inflate', () => {
        const inflated = dataHandler.inflate("08:15");
        expect(inflated.dt.isLuxonDateTime).toBe(true);
        expect(inflated.id.length >= 8).toBe(true);
        expect(inflated.inputValue).toEqual("08:15");
    });

    /**
     * Expect an objhect with weeknumber and {loggedTimes} that are populated with week info
     */
    test("Initialize emptyWeek", () => {
        const emptyWeek = dataHandler.initializeEmptyWeek();
        expect(emptyWeek.weekNumber).toEqual(dateTime.weekNumber);
        expect(emptyWeek.loggedTimes.length).toEqual(7);
        expect(emptyWeek.loggedTimes[1].day).toBe("Tuesday");
    });

    /**
     * Expects correct record structure to be returned
     */
    test("createRecord", () => {
        const _tempStart = dataHandler._startTime;
        const _tempEnd = dataHandler._endTime;
        dataHandler._startTime.dt = dateTime;
        dataHandler._endTime.dt = dateTime;
        expect(dataHandler._startTime.dt.isLuxonDateTime).toBe.true;
        const record = dataHandler.createRecord();

        expect(typeof record.id === "number").toBe(true);
        expect(typeof record.day === "string").toBe(true);
        // expect(record.dt.isLuxonDateTime).toBe.true;
        expect(typeof record.endTime === "string").toBe(true);
        expect(typeof record.startTime === "string").toBe(true);
        expect(Number.parseInt(record.endTime) <= 24).toBe(true);

        dataHandler._startTime = _tempStart;
        dataHandler._endTime = _tempEnd;
    });

    test('createDailyEntry', () => {
        // needs: starttime, endtime and associated dt

        const entry = dataHandler.createDailyEntry(input);
    });

    test('readDailyEntry', () => {
        const entry = dataHandler.readDailyEntry(id);

    });
});