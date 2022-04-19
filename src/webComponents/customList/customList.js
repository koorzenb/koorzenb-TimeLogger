import {EventEmitter} from "../../lib/events.js";
import {getHTML, formattedDate, cloneNode, registerEvent} from "../../utils/system-utils.js";
import {DataStore} from "../../lib/dataStore.js";

class customList extends HTMLElement {

    get data() {
        if (this.dataLocation != null && this._data == null) {
            this.dataStore = new DataStore(this.dataLocation);
            this._data = this.dataStore.data;
        }
        return this._data || [];
    }

    set data(newValue) {
        this._data = newValue;
    }

    get dataLocation() {
        return this._dataLocation;
    }

    set dataLocation(newValue) {
        this._dataLocation = newValue;
    }

    async connectedCallback() {
        this.renderHandler = this.renderList.bind(this);
        window.eventEmitter = new EventEmitter;     //TODO: move this out and cleanup
        window.eventEmitter.on("updated-data", this.renderHandler);
    }

    disconnectedCallback() {
        window.eventEmitter.remove("updated-data");
        this.renderHandler = null;
        this.data = null;
        this.dataStore.dispose();
    }

    async renderList() {
        this.clearList();
        const clone = await cloneNode("customList");
        const fragment = new DocumentFragment;
        for (const key of Object.keys(this.data)) {
            const listItem = document.createElement("list-item");
            const entry = this.data[key];
            listItem.description = entry.description;
            listItem.date = entry.date; //formattedDate();
            fragment.appendChild(listItem);
        }
        clone.appendChild(fragment);
        this.appendChild(clone);
    }

    clearList() {
        while (this.lastChild) {
            this.removeChild(this.lastChild);
        }
    }

    clearData() {
        this.data = [];
        this.dataStore.data = null;
        window.eventEmitter.emit("updated-data");
    }
}

customElements.define("custom-list", customList);
