import {getHTML, formattedDate, cloneNode, registerEvent} from "../../utils/system-utils.js";
class DataControl extends HTMLElement {

    async connectedCallback() {
        const response = await fetch(this.dataset.url);
        const data = await response.text();
        // const customList = document.createElement("custom-list");
        const target = document.querySelector(this.dataset.target);
        // customList.data = JSON.parse(data);
        target.data = JSON.parse(data); // send data and move on
        window.eventEmitter.emit("updated-data");
    }

}

customElements.define("data-control", DataControl);



// data-control
// on "changed"
// update UI
// get datasource.data lists
// for each record, get value and recordToUpdate.push(currentValue)
// {
//    id: 1,
//    recordValue (or just "value"): "get cucumber"
// }
// for each recordToUpdate
// item = qs(id)
// item.dataset.value = recordValue


    // update(record) {
    //     this.data.set(record.id, record.value);
    // }
