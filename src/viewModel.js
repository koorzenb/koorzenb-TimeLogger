import { registerEvent, unregisterEvents } from './utils/system-utils.js';
import { DataHandler } from './dataHandler.js';
import { LoggerRepository } from './loggerRepository.js';
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

    /**
     * Initializes view model
     */
    init() {
        const body = document.querySelector('body');
        this.itemsList = document.querySelector('main > ul');
        this.formInput = document.querySelector('form input');
        registerEvent(body, 'click', this.clickHandler);
        registerEvent(body, 'submit', this.submitHandler);
        this.dataHandler = new DataHandler();
        this.itemTemplate = document.querySelector('template#task-item');
        this.clickHandler = this._click.bind(this);
        this.submitHandler = this._submit.bind(this);
        registerEvent(body, 'click', this.clickHandler);
        // this.showEntries();
    }

    showEntries() {
        let data = this.dataHandler.getEntry();
        if (!data) data = this.dataHandler.initializeEmptyWeek();

        this.render(data);
    }

    render() {
        this.itemsList.appendChild(this.fragment);
        this.fragment = null;
    }

    /**
     * Handles click event
     * @param {*} event
     */
    _click(event) {
        event.preventDefault();
        try {
            this[`${event.target.id}`]();
        } catch (error) {
            // const targetError = error.includes('event.target.id');
            // if (!targetError) 
            console.log(error);
        }
    }

    /**
     * Handles submit event
     * @param {*} e
     */
    _submit(e) {
        e.preventDefault();
        this[`${e.target.id}`]();
    }

    toggleFormInputPlaceholder() {
        this.formInput.value = '';
        const placeholderValue = this.formInput.getAttribute('placeholder');
        this.formInput.setAttribute(
            'placeholder',
            placeholderValue == 'Starting time' ? 'End Time' : 'Starting Time'
        );
    }

    /**
     * Adds an item to the DOM
     * @param {*} event
     */
    addItem() {
        const input = this.dataHandler.inflate(this.formInput.value);
        this.toggleFormInputPlaceholder();
        if (this.dataHandler.assignInput(input) === false) return;
        const record = this.dataHandler.createRecord();
        const weekTimes = this.dataHandler.assignRecord(record);
        this.loggerRepository.saveToLocalStorage(weekTimes);
        this.createTemplate(record);
        this.render();
        this.dataHandler.clearEntries();

        // save in new format
        // getweek()
        // get localStorage
        // find indexof week in localStorage
        // find index of day in week
        // if id exist - overwrite
        //get weeknumber from localStorage
        //render before new inputs
    }

    /**
     *
     * @param {{_day: string, _id: number, loggedTimes: {start: number, end: number, _difference:number}}} entry
     * @returns
     */
    createTemplate(entry) {
        this.fragment = new DocumentFragment();
        const clone = this.itemTemplate.content.cloneNode(true);
        const itemDescription = clone.querySelector('.item-description');
        itemDescription.textContent = `${entry.startTime} - ${entry.endTime}`;
        clone.querySelector('.item-date').textContent = entry.dt.toLocaleString(
            {
                weekday: 'long',
                month: 'short',
                day: '2-digit',
            }
        );
        clone.querySelector('li').setAttribute('id', entry.id);
        this.fragment.appendChild(clone);
    }

    removeEntryFromStorage(weekNo) {
        if (Array.isArray(this.localStorage === false)) return;

        updatedEntries = this.localStorage.filter(e => e.weekNumber != weekNo);
        this.localStorage = updatedEntries;
    }
}
