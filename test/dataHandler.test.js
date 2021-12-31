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
    });

    afterEach(() => {
        dataHandler == null;
    });

    test('should ', () => {

    });
});