import Utils from "./utils"

let documentClickEvents = [];                       // We create a module level variable
document.addEventListener("click", (e) => {         // to keep all event listeners from
    documentClickEvents.forEach((listener) => {     // all instances of SlideToggle
        listener(e);                                // and add one listener on the document
    });
});

/**
 * This widget toggles the visibility of an element by animating the height of the element. It
 * animates the height using CSS Transitions and falls back to a javascript solution if not 
 * supported by the browser. Javascript animation can be forced by sending jsOnly as true.
 */
export default class SlideToggle {

    //ES6: destructuring and defaults
    constructor({
            id,                     // dom element id
            clickOutside=false,     // slide close if clicked outsdie
            jsOnly=false,           // enfource js only animation
            speed=400,              // animation speed
            interval=13,            // js animation interval
            beforeAnimate,          // callback before animation finishes
            afterAnimate,           // callback after animation finished
            clickEl                 // element to listen for click, eg. button
        }){

        if(!id) { 
            throw "Element id parameter missing to create SlideToggle object"; 
        }        
        
        this.el = document.getElementById(id);

        if(this.el === undefined) {
            throw "Dom Element not found with the passed id"; 
        }

        this.clickOutside=clickOutside;
        this.jsOnly = jsOnly;
        this.speed = speed;
        this.interval = interval;
        this.beforeAnimate = beforeAnimate;
        this.afterAnimate = afterAnimate;
        this.isAnimating = false;
        if(clickEl === undefined) {
            clickEl = this.el.dataset.clickel;
        }
        this.clickEl = clickEl;
        this.initEvents();

    }

    initEvents() {
        if(this.clickEl !== undefined) {
            Utils.log("Adding click handler on " + this.clickEl);
            documentClickEvents.push((e) => {           // pushing handler to 
                if(e.target.id === this.clickEl) {      // shared event listener
                    this.slideToggle();
                }else if(!this.el.contains(e.target) && this.clickOutside && this.visible()){
                    this.slideToggle();
                }
            }.bind(this));
        }

        if (Utils.isTransitions && !this.jsOnly) {
            // css transitions doesn't work without an initial height, hence setting the height
            this.el.style.height = this.el.clientHeight + 'px';
            this.slideToggleFunction = this.slideCSS;
            Utils.onTransitionEnd(this.el, this.onTransitionEnd.bind(this));
        }else {
            this.slideToggleFunction = this.slideJS;
        }        
    }

    slideToggle() {

        if(this.isAnimating){
            Utils.log("Still Animating, click event ignored");
            return;
        }
        this.onTransitionStart();
        this.slideToggleFunction();
    
    }

    /**
     * animates the element height using css transitions by setting the vendor specific
     * css propery on height
     */
    slideCSS() {

        this.el.style[Utils.vprefix] = 'height ' + this.speed + 'ms linear';

        let initialHeight = "0";

        if (!this.visible()) {
            this.visible('block');
            initialHeight = Utils.findAutoHeight(this.el) + "px";
        }

        setTimeout(() => {
            this.el.style.height = initialHeight;
        }, 50);

    }

    /**
     * animates the element height with javascript 
     * using a setInterval() and clearInterval()
     */
    slideJS() {
        
        let elHeight = this.el.clientHeight,
            animHeight = elHeight,
            step = 1;

        if (!this.visible()) {
            elHeight = Utils.findAutoHeight(this.el);
            animHeight = 0;
            step = -1;
            this.visible('block');
        }

        step *= Math.ceil(elHeight / (this.speed / this.interval));

        // set initial height and display   
        this.el.style.height = animHeight + 'px';

        // to increase/decrease the height of element            
        // the value of d could be dynamic for non-linear animations
        let timer = setInterval(() => { 

            if (animHeight >= step && animHeight <= elHeight) {
                animHeight = animHeight - step;
                this.el.style.height = animHeight + 'px';
            } else {
                clearInterval(timer);
                this.onTransitionEnd();
            }
        }, this.interval);

    }

    onTransitionStart() {
        Utils.log("Setting isAnimating to true");
        this.isAnimating = true;
        if(this.beforeAnimate) {
            this.beforeAnimate();
        }
    }

    onTransitionEnd() {
        Utils.log("setting isAnimating to false");
        this.isAnimating = false;
        if(!this.visible()){ 
            this.visible('none');
        }
        if(this.afterAnimate) {
            Utils.log("calling user afterAnimate function");
            this.afterAnimate();
        }
    }

    // set/get visibility of the element
    visible(visibility) {
        if (visibility) {
            this.el.style.display = visibility;
        } else {
            return (this.el.clientHeight !== 0);
        }
    }
}