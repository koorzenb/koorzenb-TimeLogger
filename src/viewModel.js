import {getParent, registerEvent, unregisterEvents} from './utils/system-utils.js';
export class ViewModel {

    constructor() {
        console.log("viewModel started");
        this.init();
    }

    dispose() {
        this.body = null;
        unregisterEvents(this.body, "click");
        delete this.clickHandler;
        delete this.itemTemplate;
        delete this.formInput;
        delete this.itemsList;
    }

    init() {
        this.body = document.querySelector("body");
        this.clickHandler = this.click.bind(this);
        this.keydownHandler = this.keydown.bind(this);
        this.formInput = document.querySelector("form input");
        registerEvent(this.body, "click", this.clickHandler);
        registerEvent(this.formInput, "keydown", this.keydownHandler);
    }

    /**
     * Handles click event
     * @param {*} event 
 */
    click(event) {
        if (event.target.tagName === "svg" || event.target.parentElement.tagName === "svg") {
            const parentElement = getParent(event.target, "button");
            const action = parentElement.dataset.action;
            action != null && this[action]();
        }
        if (event.currentTarget.id == "addItem") {
            this.formInput.classList.remove("hidden");
        }
    }

    keydown(event) {
        if (event.key != "Enter") return;
        event.preventDefault();
        this.addItem();
    }

    addItem() {
        event.preventDefault();
        const item = this.formInput.value;
        const itemObj = {
            description: item,
            date: "30 Feb",
            completed: false
        };
        window.eventEmitter.emit("create-record", itemObj);
        this.formInput.value = "";
    }

    clearList() {
        const customList = document.querySelector("custom-list");
        customList.clearData();
    }
}