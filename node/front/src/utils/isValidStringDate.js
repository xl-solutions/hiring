
export const isValidStringDate = (date_string) => {
    const today = new Date().getTime();
    const dateString = new Date(date_string).getTime();
    
    if(today > dateString) {
        const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return regEx.test(date_string);
    } else {
        return false;
    }

}