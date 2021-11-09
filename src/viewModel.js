import { registerEvent, unregisterEvents } from "./utils/system-utils.js";
import { DataHandler } from "./dataHandler.js";
export class ViewModel {

    constructor() {
        this.initHandler = this.init.bind(this);
        this.init();
        document.addEventListener('DOMContentLoaded', this.initHandler)
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(addButton, "click")
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
        const addButton = document.querySelector("#addItem");
        this.itemsList = document.querySelector("ul");
        this.formInput = document.querySelector("form input");
        registerEvent(addButton, "click", this.clickHandler);
        this.dataHandler = new DataHandler;
        this.itemTemplate = document.querySelector("template#item");
        this.clickHandler = this._click.bind(this);
        registerEvent(addButton, "click", this.clickHandler);  
        this.showEntries();
        unstash changes and fix jest
    }

   
    showEntries() {
        let data = this.dataHandler.getEntry();
        if(!data) data = this.dataHandler.initializeEmptyWeek();

        this.render(data);
    }

    render(data) {
        this.fragment = new DocumentFragment();
        for (const entry of data.loggedTimes) {
            this.modify(entry);
        }
        this.itemsList.appendChild(this.fragment);
        // TODO: add all checkbox listeners 
        this.fragment = null;
        document.querySelector("#week-descriptor").innerText = `Week ${data.loggedTimes[0].dt.weekNumber}`; //TODO: use data-content
        const startDate = data.loggedTimes[0].dt.toLocaleString({ month: 'short', day: '2-digit' });
        const endDate = data.loggedTimes[6].dt.toLocaleString({ month: 'short', day: '2-digit' });
        document.querySelector("#main-title").innerText = `${startDate} - ${endDate}`;
    }

    /**
     * Handles click event
     * @param {*} event 
     */
    _click(event) {
        if (event.currentTarget.id == "addItem") this.addItem(event);
    }

    /**
     * Adds an item to the DOM
     * @param {*} event 
     */
    addItem(event) {
        event.preventDefault();
        const entry = this.calculateHours(this.formInput.value);
        const inflated = this.inflate(entry);
        this.localStorage = entry;
        this.modify(entry);
        this.formInput.value = "";


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
        const clone = this.itemTemplate.content.cloneNode(true);
        const itemDescription = clone.querySelector(".item-description");
        const loggedTimes = entry.loggedTimes;

        if (loggedTimes?.end != null || loggedTimes?.start == null || loggedTimes == null) {
            let existingItem;
            try {
                existingItem = document.getElementById(`${id}`);
            } catch (error) { }

            if (existingItem) this.itemsList.removeChild(existingItem);
        }

        if (entry.loggedTimes?.difference != null) {
            const item = document.getElementById(`${entry.id}`);
            this.itemsList.removeChild(item);
            itemDescription.innerText = `From ${entry.loggedTimes.start} - ${entry.loggedTimes.end} = ${entry.loggedTimes.difference} hours`;
            this.formInput.setAttribute('placeholder', "Start time");
            console.log("Times calculated");
        } else if (entry.loggedTimes?.start != null){
            itemDescription.innerText = `From ${entry.loggedTimes.start} until...`;
            this.formInput.setAttribute('placeholder', "End time");
            console.log("Start time saved");
        } else {
            itemDescription.innerText = `Nothing logged...`;
        }

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
