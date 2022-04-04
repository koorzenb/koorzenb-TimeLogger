export class EventEmitter {
    constructor() {
        this._events = new Map();
    }

    dispose() {
        this._events.clear();
    }

    emit(event, args) {
        if (this.hasEvent(event) === true) {
            const events = this._events.get(event);
            events.forEach(e => e(args));
        }
    }

    hasEvent(event) {
        return this._events.has(event);
    }

    on(event, callback) {
        let events = [];

        if (this.hasEvent(event) === true) {
            events = this._events.get(event);
        } else {
            this._events.set(event, events);
        }

        if (events.indexOf(callback) == -1) {
            events.push(callback);
        }
    }

    remove(event, callback) {
        if (this.hasEvent(event)) {
            const events = this._events.get(event);
            const index = events.indexOf(callback);
            if (index != -1) {
                events.splice(index, 1);
            }
            if (events.length === 0) {
                this._events.delete(event);
            }
        }
    }

    delete(event) {
        if (this.hasEvent(event)) {
            this._events.delete(event);
        }
    }
}