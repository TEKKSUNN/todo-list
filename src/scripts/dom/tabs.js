import { createDiv, createButton, appendTo, getAllTabs } from "./helpers";

const createTab = (content) => createButton("tab", `${content}`);

const setIds = function(...elements) {
    elements.forEach((element) => {
        element.id = `${element.textContent.toLowerCase()}-${element.className}`;
    });
}

const setEvents = function(...elements) {
    elements.forEach((element) => {
        element.addEventListener("click", () => {
            activateTab(element.id);
        });
    });
}

export default function getTabs() {
    const tabs = createDiv("tabs");
    const upcoming = createTab("Upcoming");
    const today = createTab("Today");
    const thisWeek = createTab("Week");
    const thisMonth = createTab("Month");
    const thisYear = createTab("Year");
    const allTime = createTab("All");
    setIds(upcoming, today, thisWeek, thisMonth, thisYear, allTime);
    setEvents(upcoming, today, thisWeek, thisMonth, thisYear, allTime);
    appendTo(tabs, upcoming, today, thisWeek, thisMonth, thisYear, allTime);
    return tabs;
}

const activateTab = function(tabId) {
    getAllTabs().forEach((tab) => {
        if (tab.id === tabId) {
            tab.className = "tab active-tab";
        }
        else {
            tab.className = "tab";
        }
    });
}