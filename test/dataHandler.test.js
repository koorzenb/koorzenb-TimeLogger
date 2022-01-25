import {DataHandler} from "../src/dataHandler.js";
import {DateTime} from "../src/utils/luxon.JS";

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
                    year: 2022,
                    hour: 08
                },
                weekData:
                {
                    weekNumber: 4
                },
                weekdayLong: "Thursday",
                isLuxonDateTime: true
            },
            inputValue: "8"
        };

        dataHandler._startTime2 = DateTime.fromObject({hour: 8});

        dataHandler._endTime = {
            dt: {},
            inputValue: "17"
        };

        dataHandler._endTime2 = DateTime.fromObject({hour: 17});

        dataHandler.entries = new Map();
        // dataHandler.entries.set(09122021, {

        // });
    });

    afterEach(() => {
        dataHandler == null;
    });

    /**
     * Checks if entry was correctly created
     */
    test('create ', () => {

        const entry = dataHandler.createDailyEntry({startTime: dataHandler._startTime, endTime: dataHandler._endTime});
        TODO: get this crete to wrok;
        expect(entry.id).toEqual(25012022);
        expect(entry.dt.weekdayLong).toEqual("Monday");
        expect(entry.startTime).toEqual(dataHandler._startTime);
        expect(entry.difference).toEqual(dataHandler._difference);
    });


    test('getWeekStartDate ', () => {
        const date = dataHandler.getWeekStartDate();
        expect(date).toEqual(7);
    });
});