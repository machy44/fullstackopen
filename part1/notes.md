```javascript
const arto = {
  name: "Arto Hellas",
  greet: function () {
    console.log("hello, my name is " + this.name);
  },
};

setTimeout(arto.greet, 1000); // solution setTimeout(arto.greet.bind(arto))
```

The value of `this` in JavaScript is defined based on how the method is being called. When setTimeout is calling the method, it is the **JavaScript engine that actually calls the method** and, at that point, `this` refers to the global object.

- [ ] better understanding of this -> https://egghead.io/lessons/javascript-this-in-constructor-calls

JavaScript essentially only defines the types Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object.

The introduction of the class syntax was a controversial addition.
https://github.com/petsel/not-awesome-es6-classes
https://rajaraodv.medium.com/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65

JS materials

mdn js guides:

1. https://developer.mozilla.org/en-US/docs/Web/JavaScript
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

to know things deeply `You-Dont-Know-JS`.

another great resource: javascript.info.

egghead -> some things are behind paywall

# function that return function => nice pattern

```javascript
const App = () => {
  const [value, setValue] = useState(10);

  const hello = (who) => {
    const handler = () => {
      console.log("hello", who);
    };
    return handler;
  };
  return (
    <div>
      {value}
      <button onClick={hello("world")}>button</button> <button
        onClick={hello("react")}
      >
        button
      </button> <button onClick={hello("function")}>button</button>{" "}
    </div>
  );
};
```

The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users
