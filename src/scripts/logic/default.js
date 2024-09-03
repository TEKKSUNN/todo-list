import { add } from "date-fns";

import { formatDate } from "./dates";

export default function getDefaultProject() {
    const DateNow = formatDate(new Date());
    const DateVariable = formatDate(add(DateNow, { days: 1 }));
    return [
        {
            title: "To-Do List",
            description: "Make a to-do list app",
            tasks: [
                {
                    task: "Setup webpack",
                    dueDate: DateVariable,
                    priority: "high",
                    finished: true
                },
                {
                    task: "Finish Project",
                    dueDate: DateVariable,
                    priority: "high",
                    finished: true
                },
                {
                    task: "Submit Project",
                    dueDate: DateVariable,
                    priority: "high",
                    finished: true
                }
            ],
            dueDate: DateVariable,
            repeats: "none",
            notes: "This is a project for \"The Odin Project\"s online curriculum.",
            started: DateNow
        }
    ];
}