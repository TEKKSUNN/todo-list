import "./stylesheets/styles.css";

import loadHeader from "./scripts/dom/header";


const loadEverything = function() {
    loadHeader();
    console.log("hello");
}

document.addEventListener("DOMContentLoaded", loadEverything);
