import { getNotes, Project, Tasks } from "../dom/get";

import getDefaultProject from "./default";

import { sub, compareDesc } from "date-fns";
import { formatDate } from "./dates";
import { loadToday } from "./tabs";
import { handleTaskDialogs } from "../dom/dialogs";
import { closeDialogs } from "../dom/helpers";

export const handleEmptyStorage = function() {
    if (localStorage.getItem("projects") === null) {
        localStorage.setItem("projects", JSON.stringify(getDefaultProject()));
    }
    else if (getProjects().length === 0) {
        const projects = getProjects();
        projects.push(getDefaultProject()[0]);
        setProjects(projects);
    }
}

export const getProjects = function() {
    return JSON.parse(localStorage.getItem("projects"));
}

export const getProjectsLength = function() {
    return getProjects().length;
}

const setProjects = function(newProjects) {
    localStorage.setItem("projects", JSON.stringify(newProjects));
}

export const addNewProject = function(event) {
    event.preventDefault();
    const projectObject = Project.extractAllValues();
    if (!includesTitle(projectObject.title)) {
        const newProjectsStorage = getProjects();
        newProjectsStorage.push(projectObject);
        setProjects(newProjectsStorage);
        loadToday();
        closeDialogs();
    }
}

const includesTitle = function(title) {
    const projects = getProjects();
    let res = false;
    projects.map((project) => {
        if (project.title === title) {
            res = true;
        }
    });
    return res;
}

const includesTask = function(task, projectTitle) {
    const project = getProjects()[getTitleIndexOf(projectTitle)];
    let res = false;
    project.tasks.map((taskObject) => {
        if (taskObject.task === task) {
            res = true;
        }
    });
    return res;
}

const isBetween = function(newerDate, olderDate, dateForCompare) {
    return Date.parse(dateForCompare) >= Date.parse(olderDate) && Date.parse(dateForCompare) <= Date.parse(newerDate); 
}

export const getTodayProjects = function() {
    const projects = getProjects();
    const DateNow = new Date();
    const todayProjects = projects.filter((project) => {
        return isBetween(DateNow, sub(DateNow, { days: 1 }), project.started);
    });
    return todayProjects;
}

export const getWeekProjects = function() {
    const projects = getProjects();
    const DateNow = new Date();
    const weekProjects = projects.filter((project) => {
        return isBetween(DateNow, sub(DateNow, { weeks: 1 }), project.started);
    });
    return weekProjects;
}

export const getMonthProjects = function() {
    const projects = getProjects();
    const DateNow = new Date();
    const monthProjects = projects.filter((project) => {
        return isBetween(DateNow, sub(DateNow, { months: 1 }), project.started);
    });
    return monthProjects;
}

export const getYearProjects = function() {
    const projects = getProjects();
    const DateNow = new Date();
    const yearProjects = projects.filter((project) => {
        return isBetween(DateNow, sub(DateNow, { years: 1 }), project.started);
    });
    return yearProjects;
}

export const removeProject = function(projectIndex) {
    const projects = getProjects();
    projects.splice(projectIndex, 1);
    setProjects(projects);
}

export const getTitleIndexOf = function(projectTitle) {
    const projects = getProjects();
    let res = null;
    projects.forEach((project, index) => {
        if (project.title === projectTitle) {
            res = index;
        }
    });
    return res;
}

export const handleDeleteProject = function(deleteButton) {
    const projectTitle = Array.from(deleteButton.parentNode.getElementsByClassName("project-title"))[0].textContent;
    console.log(deleteButton.parentNode);
    if (includesTitle(projectTitle)) {
        removeProject(getTitleIndexOf(projectTitle));
        loadToday();
    }
}

export const addNewTask = function(projectTitle) {
    const projects = getProjects();
    const newTask = Tasks.extractAllValues();
    if (!includesTask(newTask.task, projectTitle)) {
        projects[getTitleIndexOf(projectTitle)].tasks.push(newTask);
        setProjects(projects);
    }
    handleTaskDialogs(projectTitle);
}

const getTaskIndex = function(task, projectTitle) {
    const project = getProjects()[getTitleIndexOf(projectTitle)];
    let index;
    project.tasks.map((taskObject, taskIndex) => {
        if (taskObject.task === task) {
            index = taskIndex;
        }
    })
    return index;
}

export const deleteTask = function(task, projectTitle) {
    const projects = getProjects();
    projects[getTitleIndexOf(projectTitle)].tasks.splice(getTaskIndex(task, projectTitle), 1);
    setProjects(projects);
    handleTaskDialogs(projectTitle);
}

export const handleCheck = function(checkBox, task, projectTitle) {
    const projects = getProjects();
    projects[getTitleIndexOf(projectTitle)]
        .tasks[getTaskIndex(task, projectTitle)]
        .finished = checkBox.checked;
    setProjects(projects);
}

export const saveNotes = function(projectTitle) {
    const projects = getProjects();
    const notes = getNotes();
    projects[getTitleIndexOf(projectTitle)].notes = notes;
    setProjects(projects);
    closeDialogs();
}