import { format } from "date-fns";

export const formatDate = function(date) {
    return format(date, "MM/dd/yyyy HH:mm:ss");
}