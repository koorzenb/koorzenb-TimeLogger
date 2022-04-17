import {EventEmitter} from '../../lib/events.js';
class DataControl extends HTMLElement {

    async connectedCallback() {
        //url
        // const response = await fetch(this.dataset.url);
        // const data = await response.text();

        //localStorage
        window.eventEmitter == null && (window.eventEmitter = new EventEmitter);
        const location = this.dataset.location;
        const target = document.querySelector(this.dataset.target);

        target.dataLocation = location;
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
