class TaskItem {
    connectedCallBack() {
        console.log("initiated in callback");
    }

    disconnectedCallback() {

    }

    constructor() {
        console.log("initiated in constructor");
    }


}

customElements.define('task-item', TaskItem);