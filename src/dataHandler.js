import { Dates, DateType } from "./utils/enums.js";
import { DateTime } from "./utils/luxon.js";
import { FileIO } from "./fileIO.js";

export class DataHandler {

    constructor() {
        console.log("dataHandler started");
        this.dt = new DateTime({});
        this.fileIO = new FileIO();
    }


}