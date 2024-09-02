import { Query } from "./helpers";

import { format } from "date-fns";

import { formatDate } from "../logic/dates";

const getValue = function(query) {
    return get(query).value;
}

const get = function(query) {
    return new Query(query.toString()).get();
}

export const Project = (function() {
    const getTitle = () => getValue("#title-input");
    const getDesc = () => getValue("#desc-input");
    const getDueDate = () => formatDate(getValue("#due-date-input"));
    const getRepeats = () => getValue("#repeat-input");
    const extractValues = function() {
        return { title: getTitle(), desc: getDesc(), dueDate: getDueDate(),
            repeats: getRepeats()
        };
    }
    const extractAllValues = function() {
        let values = extractValues();
        values.tasks = [];
        values.notes = "";
        values.started = formatDate(new Date());
        return values;
    }
    return { getTitle, getDesc, getDueDate, getRepeats, extractValues, extractAllValues };
})();