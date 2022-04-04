import {Dates, DateType} from "./enums.js";

/**
 * Formats and returns date
 */
export function formattedDate() {
    const date = new Date();
    const enumDate = new Dates();
    return `${enumDate.get(DateType.WEEKDAY, date.getDay())} ${enumDate.get(DateType.MONTH, date.getMonth())} ${date.getDay()}, ${date.getFullYear()}`;
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
        element,
        event,
        callback
    });
}

/**
 * Unregister and disposes either an eventlistener on a single element; 
 *  or dispose all registered eventlisteners 
 * @param {DOM Element} elements - element(s) to remove
 * @param {string} - event type
 */
export function unregisterEvents(elements, event) {
    if (elements == null || event == null || events[0] == null) return;

    elements = Array.isArray(elements) === true ? elements : [elements];

    for (const item of events) {
        if (item.element == elements && item.event == event) {
            item.element.removeEventListener(item.event, item.callback);
            item.callback = null;
            const index = events.indexOf(item);
            events.splice(index, 1);
            break;
        }
    }
}

export function loadComponents(id) {
    const template = createElement("template");
    html = getHTML(id); //fetch? ?? if fileNotExist .html, then not templated
    template.innerHTML = html;
    target.appendChild(template);
};

export async function getHTML(id) {
    // if html exist, fetch
    let html;
    try {
        const path = `./src/webComponents/${id}/${id}.html`;
        const response = await fetch(path);
        html = await response.text();
        return html;
    } catch (error) {
        console.info(`No html for ${id}`);
    }
};

export const cloneNode = async (id) => {
    const html = await getHTML(id);
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.cloneNode(true).firstChild;
};