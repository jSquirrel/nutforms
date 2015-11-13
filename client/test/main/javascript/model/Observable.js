import assert from 'assert';
import reactMixin from 'react-mixin';
import Observable from '../../../../src/main/javascript/model/Observable.js';


class ObservableMock {}
reactMixin(ObservableMock.prototype, Observable);

class ObserverMock {
    constructor() {
        this.calledTimes = 0;
        this.calledWith = [];
    }

    update() {
        this.calledTimes += 1;
        this.calledWith = arguments;
    }
}

// If you define this inside another function, arguments variable doesn't work right
let observerFuncCalledTimes = 0;
let observerFuncCalledWith = [];
function observerFunc() {
    observerFuncCalledTimes++;
    observerFuncCalledWith = arguments;
}



describe('model.Observable', function () {
    describe('#listen()', function () {
        it('should save observer to inner list when called', function () {
            let observable = new ObservableMock();
            let observer = {};
            observable.listen("change", observer);
            assert.equal(observer, observable._observers["change"][0]);
        });
    });

    describe('#unsubscribe()', function () {
        it('should remove observer from inner list when called', function () {
            let observable = new ObservableMock();
            let observer = {};
            observable.listen("change", observer);
            observable.unsubscribe("change", observer);
            assert.equal(false, observable._observers["change"].includes(observer));
        });
    });

    describe('#trigger()', function () {

        it('should update observer object when called', function () {

            let observer = new ObserverMock();

            let observable = new ObservableMock();
            observable.listen("field_changed", observer);
            observable.trigger("field_changed", "field_name", "value");

            assert.equal("field_name", observer.calledWith[0]);
            assert.equal("value", observer.calledWith[1]);
            assert.equal(1, observer.calledTimes);
        });

        it('should update observer function when called', function () {
            let observable = new ObservableMock();
            observable.listen("field_changed", observerFunc);
            observable.trigger("field_changed", "field_name", "value");

            assert.equal("field_name", observerFuncCalledWith[0]);
            assert.equal("value", observerFuncCalledWith[1]);
            assert.equal(1, observerFuncCalledTimes);
        });

        it('should update observer registered to all when any event is triggered', function () {
            let observable = new ObservableMock();
            let observer = new ObserverMock();
            observable.listen("all", observer);
            observable.trigger("field_changed", "field_name", "value");

            // When subscribed to "all", the event name is passed as first argument
            assert.equal("field_changed", observer.calledWith[0]);
            assert.equal("field_name", observer.calledWith[1]);
            assert.equal("value", observer.calledWith[2]);
            assert.equal(1, observer.calledTimes);
        });

    });
});