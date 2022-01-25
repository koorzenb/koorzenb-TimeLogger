import {registerEvent, unregisterEvents} from './utils/system-utils.js';
import {DataHandler} from './dataHandler.js';
import {LoggerRepository} from './loggerRepository.js';
export class ViewModel {
    constructor() {
        this.init();
        console.log('viewModel started');
        console.log("%cRemember to code for mobile", "color: blue");
        this.loggerRepository = new LoggerRepository('timeLoggerData');
    }

    dispose() {
        unregisterEvents(body, 'click');
        delete this.clickHandler;
        delete this.itemTemplate;
        delete this.formInput;
        delete this.itemsList;
        delete this._today;
        delete this.id;
        delete this.localStorage;
        delete this.fragment;
        delete this.dt;
        delete this.dataHandler;
    }

    init() {
        const dt = new DataHandler();
        dt.createDailyEntry();
    }


}
