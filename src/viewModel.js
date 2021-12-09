import { registerEvent, unregisterEvents } from "./utils/system-utils.js";
import { DataHandler } from "./dataHandler.js";
export class ViewModel {

    constructor() {
        this.init();
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(body, "click")
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
        const body = document.querySelector("body");
        this.itemsList = document.querySelector("main > ul");
        this.formInput = document.querySelector("form input");
        registerEvent(body, "click", this.clickHandler);
        registerEvent(body, "submit", this.submitHandler);
        this.dataHandler = new DataHandler;
        this.itemTemplate = document.querySelector("template#task-item");
        this.clickHandler = this._click.bind(this);
        this.submitHandler = this._submit.bind(this);
        registerEvent(body, "click", this.clickHandler);  
        this.showEntries();
    }

   
    showEntries() {
        let data = this.dataHandler.getEntry();
        if(!data) data = this.dataHandler.initializeEmptyWeek();

        this.render(data);
    }

    render() {
        // this.itemsList.appendChild(this.fragment);
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
        } catch (error) { }
    }

    /**
     * Handles submit event
     * @param {*} event 
     */
    _submit(event) {
        event.preventDefault();
        this[`${event.target.id}`]();
    }

    /**
     * Adds an item to the DOM
     * @param {*} event 
     */
    addItem() {
        const input = this.dataHandler.inflate(this.formInput.value);
        if (this.dataHandler.assignEntry(input) === false) return;
        const entry = this.dataHandler.createRecord();
        this.createTemplate(entry);
        this.render()
        this.formInput.value = "";
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
    modify(entry) {
        this.fragment = new DocumentFragment();
        const clone = this.itemTemplate.content.cloneNode(true);
        const itemDescription = clone.querySelector(".item-description");
        const loggedTimes = entry.inputValue;

        itemDescription.innerText = `${entry.inputValue}`;

        clone.querySelector(".item-date").innerText = entry.dt.toLocaleString({ weekday: 'long', month: 'short', day: '2-digit'});
        clone.querySelector("li").setAttribute("id", entry.id);

        this.fragment.appendChild(clone);        
    }

    removeEntryFromStorage(weekNo) {
        if (Array.isArray(this.localStorage === false)) return;        

        updatedEntries = this.localStorage.filter( e => e.weekNumber != weekNo);
        this.localStorage = updatedEntries;
    }



}
