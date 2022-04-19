import {EventEmitter} from "../../lib/events.js";
import {getHTML, formattedDate, cloneNode, registerEvent} from "../../utils/system-utils.js";
import {DataStore} from "../../lib/dataStore.js";

class customList extends HTMLElement {

    get dataStoreData() {
        if (this.dataLocation != null && this._dataStore == null) {
            this._dataStore = new DataStore(this.dataLocation);
        }
        return this._dataStore.data || [];
    }

    set dataStoreData(newValue) {
        this._dataStore.data = newValue;
    }

    get dataLocation() {
        return this._dataLocation;
    }

    set dataLocation(newValue) {
        this._dataLocation = newValue;
    }

    async connectedCallback() {
        this.renderHandler = this.renderList.bind(this);
        window.eventEmitter == null && (window.eventEmitter = new EventEmitter);
        window.eventEmitter.on("updated-data", this.renderHandler);
    }

    disconnectedCallback() {
        window.eventEmitter.remove("updated-data");
        this.renderHandler = null;
        this.dataStoreData = null;
        this._dataStore.dispose();
    }

    async renderList() {
        this.clearList();
        const clone = await cloneNode("customList");
        const fragment = new DocumentFragment;
        for (const key of Object.keys(this.dataStoreData)) {
            const listItem = document.createElement("list-item");
            const entry = this.dataStoreData[key];
            listItem.description = entry.description;
            listItem.date = entry.date; //formattedDate();
            fragment.appendChild(listItem);
        }
        clone.appendChild(fragment);
        this.appendChild(clone);
    }

    /**
     * Clear UI list
     * Intent is to clear only for rendering after updated data
     */
    clearList() {
        while (this.lastChild) {
            this.removeChild(this.lastChild);
        }
    }

    clearData() {
        this._dataStore.clearData();
        window.eventEmitter.emit("updated-data");
    }
}

customElements.define("custom-list", customList);
