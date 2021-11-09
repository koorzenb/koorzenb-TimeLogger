import { Dates, DateType} from "./enums.js";

/**
 * Formats and returns date
 */
 export function formattedDate(customDate = "") {
        const date = new Date();
        const enumDate = new Dates();     
        const offset = date.getDay();      
        const day = parseInt(customDate.substring(0,2)) || date.getDay();   // not using %7 - need actual date to complete on appendItem()
        const month = parseInt(customDate.substring(2,4))-1 || date.getMonth();
        return `${enumDate.get(DateType.WEEKDAY, day % 7)} ${enumDate.get(DateType.MONTH, month)} ${day}, ${customDate.substring(4,8) || date.getFullYear()}`; // cannot use date.getDay()
}

/**
 * Returns current week number of the year
 * @returns {number}
 */
 export function getWeek() {
    const date = new Date();
    const oneJan = new Date(date.getFullYear(),0,1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
}

/**
 * Registers eventlisteners against elements and 
 * @param {HTML element} element - element against which the eventlistner is being registered
 * @param {string} event - event type
 * @param {function} callback - function to call
 */
const events = [];
export function registerEvent(element, event, callback) {
    element.addEventListener(event, callback);
    events.push({
        element: element,
        event: event,
        callback: callback
    });
}

/**
 * Unregister and disposes either an eventlistener on a single element; 
 *  or dispose all registered eventlisteners 
 * @param {DOM Element} elements - element(s) to remove
 * @param {string} - event type
 */
export function unregisterEvents(elements,event) {
    if(elements == null || event == null || events[0] == null) return;

    elements = Array.isArray(elements) === true ? elements : [elements];

    for (const item of events) {
        if(item.element == elements && item.event == event){
            item.element.removeEventListener(item.event, item.callback);
            item.callback = null;
            const index = events.indexOf(item);
            events.splice(index,1);
            break;
        }
    }
}