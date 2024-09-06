export const handleSubmit = function(fn, ...forms) {
    forms.forEach((form) => {
        form.addEventListener("submit", (event) => { event.preventDefault() });
        form.addEventListener("submit", fn);
    });
}