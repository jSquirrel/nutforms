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