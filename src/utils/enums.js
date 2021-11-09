export const DateType = Object.freeze({
    MONTH: [ 'January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    WEEKDAY: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
})

export class Dates {
    constructor() {
        this.dates = {
            [DateType.MONTH]: {},
            [DateType.WEEKDAY]: {}
        };
    }

    dispose() {
        this.dates[DateType.MONTH] = null;
        this.dates[DateType.WEEKDAY] = null;
    }

    /**
     * 
     * @param {*} type - DataType.x, eg DataType.WEEKDAY
     * @param {*} index - index number in array
     * @returns 
     */
    get(type, index) {
        let date = this.dates[type][index];
        if (date == null) {
            date = this[type](index);
            this.dates[type][index] = date;
        }
        return date;
    }

    [DateType.MONTH](index) {
        return DateType.MONTH[index];
    }
    
    [DateType.WEEKDAY](index) {
        return DateType.WEEKDAY[index];
    }
}

