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
    })

    test("getEntry", () => {
        expect(dataHandler.add(2,5)).toEqual(7)
    })

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
    })
})