# Model documentation

Observable
==========

Any object extending Observable class can be listened to. You can subscribe to events via `listen()`
function. Both objects and functions can be subscribed. The object has to implement method `update()`.
The functions are invoked.

If you wish to unsubscribe from an event, you can use `unsubscribe()` function.

Events can be triggered upon it via `trigger()` function.

```javascript
let observable = new Observable();

let observerFunc = () => {
   // ...
}
observable.listen("change", observerFunc);

let observer = {
    update: () => {
        // ...
    }
}
observable.listen("change", observer)

observable.trigger("change", arg1, arg2);
// Invokes both observerFunc() and observer.update() with arguments arg1 and arg2
```

Observing all events
--------------------

You can observe all events by subscribing to `all` event. Be careful though, when an event is triggered upon Observable,
the observers registered to all events are passed the triggered event name as the first parameter.

```javascript
let observer = {
    update: () => {
        // ...
    }
}
observable.listen("all", observer)

observable.trigger("change", arg1, arg2);
// Invokes observer.update() with arguments "change", arg1 and arg2
```
