# Promise

## What is a `Promise`?

- `Promise` is an object with state and (usually) an unknown value at the time of its creation.
- Asynchronous functions may return a Promise of unknown value.
- This is similar to synchronous functions returning entities of known value like strings, objects, etc.
- As the function runs, the promise it returned may be `fulfilled` with a value.
- Or it may be `rejected` with a reason, by the function.
- A promise in `fulfilled` state or `rejected` state is said to be settled.
- A promise is said to be in `pending` state if it is not settled.
- State of a settled promise cannot be altered.

## Why?

- A way to write asynchronous code without Continuation-passing style (CPS).
- This gives functional composition alongside asynchronous programming.

## How does it Work?

- Functions return a new Promise object by invoking its Constructor.
- `then` and `catch` functions associate callback functions to run on Promise's state changes.
- These callbacks act like event handlers subscribed to state changes of the promises.

### Example

```javascript
function promisifiedReadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, value) => {
      if (err) return reject(err);
      resolve(value);
    });
  });
}

promisifiedReadFile("path/to/some/file")
  .then(
    (value) => console.log("onFulfilled handler"),
    (err) => console.log("onRejection handler")
  )
  .catch((err) => console.log("fallback for onRejection handler"))
  .finally(() => console.log("additional onSettled handler"));
```

### Constructor

- Promise constructor argument is an anonymous function referred to as _executor_.
- This executor is mostly a wrapper around the function's main code.
- The executor function has two built-in arguments —
  - Promise resolution function: Changes promise state from `pending` to `fulfilled`.
  - Promise rejection function: Changes promise state from `pending` to `rejected`.
- While settling the promise, these functions also set its value to the value of their argument.
- These function arguments are named `resolve` and `reject` by convention, but can have other names.
- Invoking them does not halt the executor function.

### Processing State Changes

- Functions can be associated with a Promise to process changes to its state.
- Promise object's `then` instance method is invoked when the promise is settled.
- `then` method has two arguments —
  - onFulfillment handler: A function that is invoked when the promise is `fulfilled`.
  - onRejection handler: A function that is invoked when the promise is `rejected`.
- `then` method itself returns a Promise resolving to —
  - Either the return value of the handler function it invoked.
  - Or to settled value of the main promise if the appropriate handler is not present.
- Promise object's `catch` instance method is invoked when -
  - The promise is rejected.
  - And the `then` method has no onRejection handler function.
- `catch` method has only one argument — onRejection handler.
- `catch` method too returns a Promise resolving to the return value of the handler function it invoked.
- Promise object's `catch` instance method is invoked when the promise is settled, after `then` and `catch`.

### Promise Chaining

- `then`, `catch` and `finally` methods returning Promises allows Promises to be chained.
- By chaining promises, async code can be structured like synchronous code with try and catch blocks.

### Aggregating Promises

- Static methods `all`, `allSettled`, `any`, `race` allow working with multiple pending promises at a time.

## What is Continuation-passing Stype (CPS)?

- [By example: Continuation-passing style in JavaScript](http://matt.might.net/articles/by-example-continuation-passing-style/)
- [Asynchronous programming and continuation-passing style in JavaScript](https://2ality.com/2012/06/continuation-passing-style.html)

## Links

- [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
- [What Is the Point of Promises?](https://blog.domenic.me/youre-missing-the-point-of-promises/#what-is-the-point-of-promises)
- [Creating a JavaScript promise from scratch](https://humanwhocodes.com/blog/tag/promises/)
- [Support a promise paradigm · Issue #46 · thejoshwolfe/yauzl](https://github.com/thejoshwolfe/yauzl/issues/46)
- [Promises and async/await cheatsheet](https://frontarm.com/courses/async-javascript/in-practice/cheatsheet/)
