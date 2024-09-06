import { Project, Tasks } from "../dom/get";

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

const isBetween = function(newerDate, olderDate, dateForCompare) {
    // console.log(Date.parse(dateForCompare) >= Date.parse(olderDate), Date.parse(dateForCompare) <= Date.parse(newerDate));
    // console.log(formatDate(Date.parse(dateForCompare)), formatDate(Date.parse(newerDate)));
    console.log(newerDate, olderDate, dateForCompare);
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
    console.log(projects);
    const weekProjects = projects.filter((project) => {
        console.log(project);
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
    projects[getTitleIndexOf(projectTitle)].tasks.push(newTask);
    setProjects(projects);
    handleTaskDialogs(projectTitle);
}