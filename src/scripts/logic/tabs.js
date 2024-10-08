import { boolChoiceDialog, showNewTaskForm, showNotesDialog, showTasksDialog } from "../dom/dialogs";
import { createDiv, createButton, appendTo, getAllTabs, createText, getContent, resetContent, handleClick } from "../dom/helpers";
import { getMonthProjects, getProjects, getTitleIndexOf, getTodayProjects, getWeekProjects, getYearProjects, handleDeleteProject } from "./object";
import { format } from "date-fns";

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
    const today = createTab("Today");
    const thisWeek = createTab("Past Week");
    const thisMonth = createTab("Past Month");
    const thisYear = createTab("Past Year");
    const allTime = createTab("All");
    setIds(today, thisWeek, thisMonth, thisYear, allTime);
    setEvents(today, thisWeek, thisMonth, thisYear, allTime);
    handleClick(loadToday, today);
    handleClick(loadWeek, thisWeek);
    handleClick(loadMonth, thisMonth);
    handleClick(loadYear, thisYear);
    handleClick(loadAll, allTime);
    appendTo(tabs, today, thisWeek, thisMonth, thisYear, allTime);
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

const content = getContent();

const createProjectCard = function(project) {
    const projectIndex = getTitleIndexOf(project.title);
    const projectCard = createDiv("project-card");
    const upperPart = createDiv("card-upper");
    const projectTitle = createText("project-title", project.title, "h3");
    const deleteButton = createButton(`delete delete-project-${projectIndex}`, "");
    handleClick(() => boolChoiceDialog(`Are you sure you want to delete the \"${project.title}\" project?`,
        () => { handleDeleteProject(document.querySelector(`.delete-project-${projectIndex}`)) }), deleteButton);
    appendTo(upperPart, projectTitle, deleteButton);
    const lowerPart = createDiv("card-lower");
    const projectDesc = createText("project-desc", project.description, "p");
    const startedStatus = createText("project-started", ` -${format(project.started, "MM/dd/yyyy")}`, "span");
    appendTo(projectDesc, startedStatus);
    const buttons = createDiv("card-buttons");
    const viewButton = createButton("view view-project", "");
    handleClick(() => showTasksDialog(project.title), viewButton);
    const addTaskButton = createButton("project-add-task", "");
    handleClick(() => boolChoiceDialog("Do you want to add a task for this project?", () => { showTasksDialog(project.title); showNewTaskForm() }), addTaskButton);
    const notesButton = createButton("project-notes", "");
    handleClick(() => showNotesDialog(project.title), notesButton);
    appendTo(buttons, notesButton, addTaskButton, viewButton);
    appendTo(lowerPart, projectDesc, buttons);
    appendTo(projectCard, upperPart, lowerPart);
    return projectCard;
}

export const loadToday = function() {
    const projects = getTodayProjects();
    activateTab("today-tab");
    updateTab(projects);
}

const loadWeek = function() {
    updateTab(getWeekProjects());
}

const loadMonth = function() {
    updateTab(getMonthProjects());
}

const loadYear = function() {
    updateTab(getYearProjects());
}

const loadAll = function() {
    updateTab(getProjects());
}

const updateTab = function(projects) {
    resetContent();
    projects.forEach((project) => {
        appendTo(content, createProjectCard(project));
    });
}