import {cloneNode} from "../../utils/system-utils.js";

// - script
//     - onChangedAttrib dataset.value
//         - update UI
//             - this/descriptions.textContent = dataset.value 

//     addNewItem() {
//         - update datasource.data
//         - emit("changed")
//     }


// lite version:
// - listElememnt = createElement(list-item)
// - listElement.description = descriptiobn
// - on ConnectedCallback = get description() and populate


class ListItem extends HTMLElement {

    get description() {
        return this._description;
    }

    get date() {
        return this._date;
    }

    set description(newValue) {
        this._description = newValue;
    }

    set date(newValue) {
        this._date = newValue;
    }

    async connectedCallback() {
        const clone = await cloneNode("list-item");
        clone.querySelector("#description").innerText = this.description;
        clone.querySelector("#date").innerText = this.date;
        this.appendChild(clone);
    }

    disconnectedCallback() {
        this.description = null;
        this.date = null;
    }


}

customElements.define("list-item", ListItem);
