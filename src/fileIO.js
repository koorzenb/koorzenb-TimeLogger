export class FileIO {

    constructor(name) {
        if (name == null) console.error("No name defined")
        this.localStorageName = name
    }

    get currentStorage() {
        try {
            this._currentStorage = localStorage.getItem(this.localStorageName);
        } catch (error) {
            this._currentStorage = {};
        }

        if (Object.keys(this._currentStorage).length != 0) {
            JSON.parse(this._currentStorage)
        } else { 
            this.currentStorage = {};
        }

        return this._currentStorage;
    }

    set currentStorage(newValue) {
        this._currentStorage = newValue;
        localStorage.setItem(this.localStorageName, newValue);
    }

    saveToLocalStorage(newHours) {
        this.currentStorage = JSON.stringify(newHours);
    }

    loadFromLocalStorage() {
        return this.currentStorage
    }

}
