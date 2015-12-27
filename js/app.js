import SlideToggle from "./slide-toggle"

let button1 = document.getElementById('button1');

new SlideToggle({
    id: "slideToggle1",
    clickOutside: true,
    speed: 700,
    beforeAnimate: function() {
        button1.classList.add("animating");
    },
    afterAnimate: function() {
        button1.classList.remove("animating");
    },
});

new SlideToggle({
    id: "slideToggle2",
    clickElId: "button2",
    jsOnly: true
});