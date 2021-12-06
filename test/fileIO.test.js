import { FileIO } from "../src/fileIO.js";

describe("FileIO tests", () => {
    let storage;
    let fileIO

    beforeAll(() => {
        // fileIO = new FileIO();
        // storage = fileIO.loadFromLocalStorage();
        // TODO: have to mock localStorage
        // see https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/
    });
    
    /**
     * Check if data has items that each contain keys called "week" and "entries" 
     */
    test('data structure integrity', () => {
        // expect(data.keys).toIncl();
    });

    /**
     * Check if data structure is initialized on first run
     */
    test('storage initializer', () => {
        // has week:0 and entries: empty
    
        // expect(typeof storage).toEqual("object");
    });

    /**
     * Check if entries has a description and date portion
     */
    test('entry structure integrity', () => {
        // has desctipt and date
    });


    //save to array
    //save to localStorage: //TODO: send to webworker

    //append to GUI

    // buttons:
    //     get yesterday/localStorage and display
    //     clear localStorage

    
    // const data = { "202152": 
    //     {
    //         date: "31112021",
    //         description: "blah"
    //     }
    // }

    // new entry() {
    //     this.entries.push(entry)
    //     save()
    // }

    // save() {
    //     data.set(weekId, entries)
    // }
})