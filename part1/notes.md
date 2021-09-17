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

better understanding of this -> https://egghead.io/lessons/javascript-this-in-constructor-calls - saw till the end

```javascript
const person = {
  firstName: "John",
  sayHi: function () {
    console.log(`Hi, my name is ${this.firstName}`);
  },
};

setTimeout(person.sayHi, 1000); // calls our function with this set to the global object
// solution can be to wrap it in another function
// setTimeout(() => person.sayHi(), 1000); || setTimeout(person.sayHi.bind(person), 1000);
```

## call

```javascript
function sayHi() {
  console.log(`Hi, my name is ${this.name}`);
}

const person = {
  name: "John ",
};

sayHi.call(person);
```

## bind

own version

```javascript
const person = {
  firstName: "John",
  sayHi: function (...args) {
    console.log(`Hi, my name is ${this.firstName} ${args}`);
  },
};

Function.prototype.myBind = function (thisArg, ...fixedArgs) {
  const that = this;
  console.log(this);
  return function (...args) {
    console.log("return function this", this); // setup on window
    return that.apply(thisArg, [...fixedArgs, ...args]);
  };
};

const greet = person.sayHi.myBind(person);

greet("dynamic arg");
```

## arrow function

you cant call as constructor

```javascript
const counter = {
  count: 0,
  incrementPeriodically() {
    // solution to make arrow function
    setInterval(function () {
      console.log(++this.count); //this is setup to window. I assume because setInterval works that way
    }, 1000);
  },
};

counter.incrementPeriodically();
```

## this in class

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.sayHi = this.sayHi.bind(this); // if sayHi is not bounded fistName would be undefined
  }

  sayHi() {
    console.log(`Hi, my name is ${this.firstName}!`);
  }
}

const person = new Person("John", "Doe");
const greet = person.sayHi;
greet();
```

another way is to use arrow function

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // class field
  sayHi = () => {
    console.log(`Hi, my name is ${this.firstName}!`);
  };
}

const person = new Person("John", "Doe");
const greet = person.sayHi;
greet();
```

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
