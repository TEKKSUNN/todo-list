import { Project } from "../dom/get";

import getDefaultProject from "./default";

import { sub, compareDesc } from "date-fns";
import { formatDate } from "./dates";

export const handleEmptyStorage = function() {
    if (localStorage.getItem("projects") === null) {
        localStorage.setItem("projects", JSON.stringify(getDefaultProject()));
    }
}

export const getProjects = function() {
    return JSON.parse(localStorage.getItem("projects")).sort(compareDesc);
}

const setProjects = function(newProjects) {
    localStorage.setItem("projects", JSON.stringify(newProjects));
}

export const addNewProject = function(event) {
    event.preventDefault();
    const projectObject = Project.extractAllValues();
    const newProjectsStorage = getProjects();
    newProjectsStorage.push(projectObject);
    setProjects(newProjectsStorage);
}

const isBetween = function(newerDate, olderDate, dateForCompare) {
    console.log(Date.parse(dateForCompare) >= Date.parse(olderDate), Date.parse(dateForCompare) <= Date.parse(newerDate));
    console.log(formatDate(Date.parse(dateForCompare)), formatDate(Date.parse(newerDate)));
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