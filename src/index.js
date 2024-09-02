import "./stylesheets/styles.css";

import loadHeader from "./scripts/dom/header";

import { handleEmptyStorage } from "./scripts/logic/object";

const loadEverything = function() {
    handleEmptyStorage();
    loadHeader();
}

document.addEventListener("DOMContentLoaded", loadEverything);
