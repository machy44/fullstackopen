read about

1. event loop -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
2. microtasks -> https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
3. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

4. https://medium.com/techtrument/multithreading-javascript-46156179cf9a

What the heck is the event loop anyway? -> https://www.youtube.com/watch?v=8aGhZQkoFbQ

The use of XHR is no longer recommended, and browsers already widely support the fetch method, which is based on so-called promises, instead of the **_event-driven model used by XHR._**

Currently, JavaScript engines are single-threaded, which means that they cannot execute code in parallel. As a result, it is a requirement in practice to use a non-blocking model for executing IO operations. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.

Another consequence of this single-threaded nature of JavaScript engines is that if some code execution takes up a lot of time, the browser will get stuck for the duration of the execution. If we added the following code at the top of our application:

```javascript
setTimeout(() => {
  console.log("loop..");
  let i = 0;
  while (i < 50000000000) {
    i++;
  }
  console.log("end");
}, 5000);
```

everything would work normally for 5 seconds. However, when the function defined as the parameter for setTimeout is run, the browser will be stuck for the duration of the execution of the long loop. Even the browser tab cannot be closed during the execution of the loop, at least not in Chrome.

For the browser to remain responsive, i.e. to be able to continuously react to user operations with sufficient speed, the code logic needs to be such that no single computation can take too long.

**_port numbers lower than 1024 identify the historically most commonly used services and are called the well-known port numbers.
Higher-numbered ports are available for general use by applications and are known as ephemeral ports._**

```javascript
npm install axios // axios is needed as a runtime dependency of the application. Execution of the program requires it
npm install json-server --save-dev // doesnt require this lib in a runtime
```

promise has 3 states:

1. pending - final value is not available
2. fulfilled - operations is completed and the final value is available.
3. rejected - failed operation

to access promise result event handler has to be registered to the promise.

useEffect - in charge to manage side effects in components.
examples of side effects:

1. data fetching
2. setting up a subscription
3. manually changing the DOM in react components
