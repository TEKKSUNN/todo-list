import { Query } from "./helpers";

export const Project = (function() {
    const getTitle = new Query("#title-input").get;
    const getDesc = new Query("#desc-input").get;
    const getDueDate = new Query("#due-date-input").get;
    const getRepeats = new Query("#repeat-input").get;
    const extractValues = function() {
        return { title: getTitle(), desc: getDesc(), dueDate: getDueDate(),
            repeats: getRepeats()
        };
    }
    const extractAllValues = function() {
        let values = extractValues();
        values.tasks = [];
        values.notes = "";
        return values;
    }
    return { getTitle, getDesc, getDueDate, getRepeats, extractValues, extractAllValues };
})();