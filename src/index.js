import "./stylesheets/styles.css";

import loadHeader from "./scripts/dom/header";

import { handleEmptyStorage } from "./scripts/logic/object";
import { loadToday } from "./scripts/logic/tabs";

const loadEverything = function() {
    handleEmptyStorage();
    loadHeader();
    loadToday();
}

document.addEventListener("DOMContentLoaded", loadEverything);
