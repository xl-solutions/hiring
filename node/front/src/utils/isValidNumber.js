
export const isValidNumber = (number) => {
    if(number){
        const regEx = /^\d+$/;
        return regEx.test(number);
    }

}