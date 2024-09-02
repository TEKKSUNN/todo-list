import { Project } from "../dom/get";

import getDefaultProject from "./default";

import { closeDialogs } from "../dom/helpers";

export const handleEmptyStorage = function() {
    if (localStorage.getItem("projects") === null) {
        localStorage.setItem("projects", JSON.stringify(getDefaultProject()));
    }
}

const getProjects = function() {
    return JSON.parse(localStorage.getItem("projects"));
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