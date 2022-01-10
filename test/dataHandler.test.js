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

    test('should ', () => {

    });
});