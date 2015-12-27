## Slide Toggle (ES6)

A pure javascript ([EcamaScript 6](https://kangax.github.io/compat-table/es6/)) widget which toggles the visibility of an element by animating the height. It animates using CSS Transitions and falls back to a javascript animation if transitions are not supported by the browser.

### New Stuff
The project uses [Babel](babeljs.io) to compile ES6 javascript code. Some of the features of ES6 you will notice in the project are:
* Classes
* Modules
* Destructuring
* Arrow functions

You will also see usage of some javascript features which may not work in older browsers:
* [Node.contains()](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
* [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
* [Array.prototype.some()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* Browser [transitionend](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) event
* [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

### Widget Features:
* Uses transitions to animate the object and falls back to javascript based transition if the browser does not support transitions.
* You can pass some options to chaange behaviour, more details in the options sectino below.
* If you try to call the slideToggle while the widget is animating, it will ignore your clicks till it finishes animating.
* You can pass debug=true parameter to see logs in the console.
* The HTML, CSS is quite basic and not the focus of this project however the demo page is responsive.


### Widget Options :

* `jsOnly` (boolean) - Set this to true to not use css transitions and use only js animation. Default is false;
* `clickOutside` (boolean) - Enables the widget to close if you click anywhere on the page except the on widget.
* `beforeAnimate` (function) - callback before animate starts
* `afterAnimate` (function) - callback after animate ends
* `speed` (milliseconds) - To set the duration of the animation for the element to hide or show
* `interval` (milliseconds) - To set the interval for the `setInterval` call which will affect the frame rate. Default value is 13ms as used by jQuery. Please note that this option is for js animation only.
* `clickElId` (string) - pass id of an element to associate a listener for click event to toggle the widget. Alternatively, you can also do this by defining a `data-clickelid` attribute on the html element.

### Usage:
```javascript
let slideToggle1 = new SlideToggle({id:"slidToggle1"});

let slideToggle2 = new SlideToggle({
    id:"slideToggle2", jsOnly: true, speed: 700
});

slideToggle1.slideToggle();
```

### Files
* `/js/app.js` is the entry point and initiates two instances of the widget
* `/js/slideToggle.js` is where all the widget code resides
* `/js/Utils.js` contains some static utitlity functions to detect browser features.

### How to setup on your local
* Start by cloning the repository.
* You can straight away open index.html file in your browser which will use an already compiled and minified file from dist folder
* If you want to change and play around with the code, then you need [NodeJS](https://nodejs.org).
  * Run `npm install` followed by `npm start`, this will start watching for your changes using browserify.
  * You can also run `npm run build` to create a minified version.

## License
This project is MIT-licensed.