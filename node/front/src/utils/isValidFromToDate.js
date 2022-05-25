export const isValidFromToDate = (from, to) => {
    const fromDate = new Date(from).getTime();
    const toDate = new Date(to).getTime();
    
    if(fromDate > toDate) {
        return false;
    } else {
        return true;
    }

}