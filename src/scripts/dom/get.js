import { Query } from "./helpers";

import { formatDate } from "../logic/dates";

const getValue = function(query) {
    return get(query).value;
}

export const get = function(query) {
    return new Query(query.toString()).get();
}

export const Project = (function() {
    const getTitle = () => getValue("#title-input");
    const getDesc = () => getValue("#desc-input");
    const getDueDate = () => formatDate(getValue("#due-date-input"));
    const extractValues = function() {
        return { title: getTitle(), description: getDesc(), dueDate: getDueDate() };
    }
    const extractAllValues = function() {
        let values = extractValues();
        values.tasks = [];
        values.notes = "";
        values.started = formatDate(new Date());
        return values;
    }
    return { getTitle, getDesc, getDueDate, extractValues, extractAllValues };
})();

const getRadioValue = function(radioContainerQuery) {
    return getValue(`${radioContainerQuery} input[type=\"radio\"]:checked`);
}

export const Tasks = (function() {
    const getTask = () => getValue("#task-name");
    const getDueDate = () => formatDate(getValue("#due-date-task"));
    const getPriority = () => getRadioValue("#task-priority-list");
    const getFinishedState = () => JSON.parse(getRadioValue("#task-finished-state"));
    const extractAllValues = () => {
        return {
            task: getTask(),
            dueDate: getDueDate(),
            priority: getPriority(),
            finished: getFinishedState()
        };
    }
    return { extractAllValues };
})();

export const getNotes = () => getValue("#notes-textarea");