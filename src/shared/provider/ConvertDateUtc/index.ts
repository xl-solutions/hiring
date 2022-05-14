
const convertDate = (dateString: string) =>{
    return Date.parse(dateString);
}

const convertDateToUTC = (dateString: string)=>{

    let dateNumber = Date.parse(dateString)

    let dateParse = new Date(dateNumber);

    let date = dateParse.getFullYear().toString() + "-";
    date += (dateParse.getMonth() + 1).toString().padStart(2, '0') + "-";
    date += (dateParse.getDate()+1).toString().padStart(2, '0') + "T";
    date += dateParse.getHours().toString().padStart(2, '0') + ":";
    date += dateParse.getMinutes().toString().padStart(2, '0') + ":";
    date += dateParse.getSeconds().toString().padStart(2, '0') + "Z";

    return date;
}

export { convertDateToUTC , convertDate };