export default class Observable {

    /**
     * Observable constructor.
     */
    constructor() {
        this._observers = {};
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
        this._observers[event].forEach((observer) => {
            if (typeof observer === 'object') {
                observer.update(...args);
            } else {
                observer(...args);
            }
        });
    }

}
