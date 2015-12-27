let Utils = {};

let debug = location.href.indexOf("debug=true") > -1;
Utils.log = function(log) {
    if (debug) {
        console.log(log);
    }
}

/**
 * Function to check if transitions are supported in the browser. For performance, this
 * function calculates the value only once and persist it for future calls.
 */

Utils.isTransitions = function() {

    let isTransition = false,
        style = document.createElement("div").style,
        vendors = {
            'transition': 'transitionend',
            'webkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MsTransition': 'MSTransitionEnd'
        };

    Object.keys(vendors).some((prefix) => {
        if (prefix in style) {
            Utils.log("browser supports transitions");
            Utils.vprefix = prefix;
            Utils.log("browser transitions prefix: " + prefix);
            Utils.transitionEnd = vendors[prefix];
            Utils.log("browser transition end callback name: " + vendors[prefix]);
            isTransition = true;
            return true;
        } else {
            Utils.log("browser does not support transitions");
            isTransition = false;
            return false;
        }
    });

    return isTransition;
}();

Utils.onTransitionEnd = function(el, listener) {
    el.addEventListener(Utils.transitionEnd, listener);
}

/**
 * Function to find the auto height of the element when showing the element.
 * It displays the element out of the view and gets its height.
 */
Utils.findAutoHeight = function(el) {
    let oldCssText = el.style.cssText,
        w = el.parentNode.clientWidth;
        
    el.style.cssText = oldCssText +
        'display:block;position:absolute;top:-999px;height:auto;width:' + w + 'px';
    let h = el.clientHeight;

    el.style.cssText = oldCssText;
    return h;
}

Object.freeze(Utils);

export default Utils;