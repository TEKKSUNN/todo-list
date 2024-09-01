export const handleSubmit = function(fn, ...forms) {
    forms.forEach((form) => {
        form.addEventListener("submit", fn);
    });
}