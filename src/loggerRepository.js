export class LoggerRepository {

    constructor(name) {
        if (name == null) console.error("No name defined")
        this.localStorageName = name
    }

    get storage() {
        try {
            this._storage = localStorage.getItem(this.localStorageName);
        } catch (error) {
            this._storage = {};
        }

        if (this._storage == null) {
            this._storage = {};
        } else if (Object.keys(this._storage).length != 0) {
            thisJSON.parse(this._storage)
        }
        

        return this._storage;
    }

    set storage(newValue) {
        this._storage = newValue;
        localStorage.setItem(this.localStorageName, newValue);
    }

    saveToLocalStorage(newHours) {
        this.storage = JSON.stringify(newHours);
    }

    loadFromLocalStorage() {
        return this.storage
    }

}
