import { DataHandler } from "../src/dataHandler.js";
import { DateTime } from "../src/utils/luxon.JS";

describe("DataHandler tests", () => {

    let dataHandler;
    let dateTime;

    beforeAll(() => {
        dateTime = new DateTime({});
    })

    beforeEach(() => {
        dataHandler = new DataHandler;
    })

    afterEach(() => {
        dataHandler == null;
    });

    test("empty getEntry", () => {


    })

    /**
     * Expect an objhect with weeknumber and {loggedTimes} that are populated with week info
     */
    test("Initialize emptyWeek", () => {
        const emptyWeek = dataHandler.initializeEmptyWeek();
    
        expect(emptyWeek.weekNumber).toEqual(dateTime.weekNumber)
        expect(emptyWeek.loggedTimes.length).toEqual(7);
        expect(emptyWeek.loggedTimes[1].day).toBe("Tuesday");

        // {
        //     weekNumber: x,
        //     loggedTimes: [
        //         {
        //             day: Sunday,
        //             id: 12112021,
        //             dateTimeObj: dt,
        //             calendarDate: 21,
        //             offset: currentDayNumberOfTheWeek - thisDayNumberOfTheWeek
        //         }, 
        //         {
        //             day: Monday,
        //             // ...
        //         }
        //     ]
        // }
    });

    test('Expect calcHours to return difference between start and end times ', () => {
        const start = DateTime.fromObject({hour: 9});
        const end = start.plus({hours: 3, minutes: 2});
        const diff= end.diff(start)
        expect(diff.values.milliseconds).toEqual(10920000);

        const callDiff = dataHandler.calculateHours(start, end);
        expect(callDiff).toEqual(10920000)
    });

})