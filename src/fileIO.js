export class FileIO {

    get localStorage() {
        if (this._currentStorage == null) {
            this._currentStorage = localStorage.getItem(this.entryDate)
            this._currentStorage = JSON.parse(this._currentStorage);
        }
        return this._currentStorage == null ? {} : this._currentStorage
    }

    set localStorage(newValue) {
        // save by date
        // {
        //     lastsaved: "03102021",
        //     entries: [
        //         {
        //             weekNumber: 50,
        //             loggedTimes: [
        //                 [
        //                     {day: ...},
        //                     {day: ...}
        //                 ]
        //             ]
        //         }
        //     ]
        // }
        this._currentStorage = newValue;
        localStorage.setItem(this.entryDate, JSON.stringify(newValue));
    }

    saveToLocalStorage(newHours) {
        // const currentStorage = localStorage.getItem(this.entryDate)

        this.localStorage.setItem(JSON.stringify(newHours));
    }

}
