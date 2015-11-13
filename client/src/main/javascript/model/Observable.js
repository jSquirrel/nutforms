export default class Observable {

    constructor() {
        this._observers = {
            "all": []
        }
    }

    /**
     * Subscribes an observer object or function to an event of the Observable.
     *
     * @param {string} event
     * @param {function|object} observer
     */
    listen(event, observer) {
        if (!this._observers.hasOwnProperty(event)) {
            this._observers[event] = [];
        }
        this._observers[event].push(observer);
    }

    /**
     * Unsubscribes an observer object or function from an event of the Observable.
     *
     * @param {string} event
     * @param {function|object} observer
     */
    unsubscribe(event, observer) {
        if (!this._observers.hasOwnProperty(event)) {
            return;
        }
        this._observers[event] = this._observers[event].filter((i) => {
            return i !== observer;
        });
    }

    /**
     * Triggers an event with given name and with given parameters on the Observable.
     *
     * @param {string} event
     * @param {...*} argument
     */
    trigger(event, argument) {
        let args = Array.prototype.slice.call(arguments, 1);
        if (event !== "all" && this._observers.hasOwnProperty(event)) {
            this._invokeObservers(event, args);
        }
        args.unshift(event);
        this._invokeObservers("all", args);
    }

    /**
     * Invokes all observers subscribed to given event name.
     *
     * @param {string} eventName
     * @param {Array} args
     * @private
     */
    _invokeObservers(eventName, args) {
        this._observers[eventName].forEach((observer) => {
            if (typeof observer === 'object') {
                observer.update.apply(observer, [eventName, ...args]);
            } else {
                observer.apply(observer, args);
            }
        });
    }

};
