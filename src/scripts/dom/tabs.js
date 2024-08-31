import { createDiv, createButton, appendTo } from "./helpers";

const createTab = (content) => createButton("tab", `${content}`);

export default function getTabs() {
    const tabs = createDiv("tabs");
    const upcoming = createTab("Upcoming");
    const today = createTab("Today");
    const thisWeek = createTab("Week");
    const thisMonth = createTab("Month");
    const thisYear = createTab("Year");
    const allTime = createTab("All");
    appendTo(tabs, upcoming, today, thisWeek, thisMonth, thisYear, allTime);
    return tabs;
}