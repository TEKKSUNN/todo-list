import "./stylesheets/styles.css";

import loadHeader from "./scripts/dom/header";


const loadEverything = function() {
    loadHeader();
}

document.addEventListener("DOMContentLoaded", loadEverything);
