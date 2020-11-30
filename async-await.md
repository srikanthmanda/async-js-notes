# `async` and `await`

## What are `async` and `await`?

- `async` and `await` are syntactic sugar for working with Promises.
- `async function` is syntactically closer to `return new Promise(...)` statement.
- `await` operator is analogous to `Promise.then` method.
- Together they help write asynchronous code without nested callbacks or then blocks.

## `async`

- `async` keyword/modifier wraps a function in a `Promise`.
- It returns a `Promise`, instead of the expression in the function's `return` statement.
- This promise may `resolve` with the value of the expression in the return statement.
- Or it may `reject` with the reason of error encountered during the function execution.

## `await`

- `await` operator unwraps a `Promise`.
- It extracts the `resolve`d value if the promise is `fulfilled`.
- Or it throws with `reject`ed reason if the promise is `rejected`.

## Usage Notes

- An `async` function always returns a promise and `await` can access its return value.
- `async` functions run synchronously till an `await` operation is encountered.
- `await` operation defers execution of `async` functions, letting `pending` promises get `settled`.
- So an `async` function with **no** `await` statements ends **synchronously**.
- And an `async` function **with** `await` statements ends **asynchronously**.
- `await` can only be used inside an `async` function, at least for now.

## Awaiting multiple Promises or Async functions

- `async` and `await` offer no alternative to working with Promises for handling multiple `async` functions or promises.
- `Promise` methods `all`, `allSettled`, `any` and `race` are required to `await` multiple `async` functions or promises.

## Links

- [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async function - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [⭐️🎀 JavaScript Visualized: Promises & Async/Await](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
- [ECMAScript proposal: Top-level `await`](https://github.com/tc39/proposal-top-level-await)
- [Promises and async/await cheatsheet](https://frontarm.com/courses/async-javascript/in-practice/cheatsheet/)
