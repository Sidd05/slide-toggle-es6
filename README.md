## Slide Toggle (ES6)

This is pure javascript (EcmaScript6) widget which toggles the visibility of an element by animating the height of the element. It animates the height using CSS Transitions and falls back to a javascript solution if transitions are not supported by the browser.

The focus of the project is to checkout some new [EcamaScript 6](https://kangax.github.io/compat-table/es6/) features and how you can use it already with [Babel](babeljs.io) in your projects. Some of the features of ES6 you will notice in the project are:
* Classes
* Modules
* Destructuring
* Arrow functions

You will also see some other new stuff which may not work in older browsers:
* [Node.contains()](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
* [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
* [Array.prototype.some()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* Browser [transitionend](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) event
* [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

### How to setup on your local
You have start by cloning the repository. Then you have two options :
* You can straight away open index.html file in your browser which will use an already compiled and minified file from dist folder
* If you want to change and play around with the code, then you need node. 
* Run `npm install` followed by `npm start`, this will start watching for your changes using browserify.
* You can also run `npm run build` to create a minified version.

### Widget Features:
* Uses transitions to animate the object and falls back to javascript based transition if the browser does not support transitions.
* You can pass some options to chaange a bit of behaviour, more details in the options
* If you try to call the slideToggle while the widget is animating, it will ignore your clicks till it finishes animating
* Shares one event listener among all the instances of the widget. Notice in the code.
* You can pass debug=true parameter to see some logs in the console.

### Options :

* `jsOnly` (boolean) - Set this to true to not use css transitions and use only js animation. Default is false;
* `clickOutside` (boolean) - Enables the widget to close if you click anywhere outside the widget.
* `beforeAnimate` (function) - callback before animate starts
* `afterAnimate` (function) - callback after animate ends
* `speed` (milliseconds) - To set the duration of the animation for the element to hide or show
* `interval` (milliseconds) - To set the interval for the `setInterval` call which will affect the frame rate. Default value is 13ms as used by jQuery. Please note that this option is for js animation only.
* `clickEl` (string) - pass id of an element to associate a listener for click event to toggle the widget. Alternatively, you can also do this by defining a `data-clickel` attribute on the html element.

### Usage:
```javascript
let slidToggle1 = new SlideToggle({id:"slidToggle1"});

let slideToggle2 = new SlideToggle({
    id:"slideToggle2", jsOnly: true, speed: 700
});

slideToggle1.slideToggle();
```
