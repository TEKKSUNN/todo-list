import { closeDialogs } from "../dom/helpers";

export const handleSubmit = function(fn, ...forms) {
    forms.forEach((form) => {
        form.addEventListener("submit", fn);
        form.addEventListener("submit", closeDialogs);
    });
}