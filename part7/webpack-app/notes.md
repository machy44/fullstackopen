## Loaders 
By default, webpack only knows how to deal with plain JavaScript. Although we may have become unaware of it, we are actually using JSX for rendering our views in React

We can use loaders to inform webpack of the files that need to be processed before they are bundled.


## Transpilers

transpiling the code containing JSX into regular JavaScript with the help of babel, which is currently the most popular tool for the job.

As mentioned in part 1, most browsers do not support the latest features that were introduced in ES6 and ES7, and for this reason the code is usually transpiled to a version of JavaScript that implements the ES5 standard.

The transpilation process that is executed by Babel is defined with plugins. In practice, most developers use ready-made presets that are groups of pre-configured plugins.

## CSS

style loader - Inject CSS into the DOM
css-loader - The css-loader interprets @import and url() like import/require() and will resolve them
mini-css-extract-plugin - extracts CSS into separate files.

## Minifying the code

The optimization process for JavaScript files is called minification. One of the leading tools intended for this purpose is UglifyJS.

The output of the minification process resembles old-school C code; all of the comments and even unnecessary whitespace and newline characters have been removed, and **variable names have been replaced with a single character**.

## webpack configurations

If the configuration for development and production differs a lot, it may be a good idea to separate the configuration of the two into their own files. (https://webpack.js.org/guides/production/)

We can inspect the bundled production version of the application locally by executing the following command in the build directory:

```npx static-server```


## Diff between pollyfill and tranpsiler  

transpiler transpile new syntax to browser's understandable syntax.

if we use some method which doesnt exist in some browser we can create polyfill. For example


```js
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}
```
