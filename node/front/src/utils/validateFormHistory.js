import { isValidStringDate } from "./isValidStringDate";
import { isValidFromToDate } from "./isValidFromToDate";

export const validateFormHistory = (formData, errors, setErrors) => {
    const {stock_name, from, to} = formData;
    setErrors({});
    console.log(stock_name);
    if(stock_name === 'none' || stock_name === undefined) {
      setErrors({...errors, name: "Deve inserir um Stock"});
      return false;
    }
    if(!isValidStringDate(from)) {
      setErrors({...errors, from: "O formato da data é invalida"});
      return false;
    }
    if(!isValidStringDate(to)) {
      setErrors({...errors, to: "O formato da data é invalida"});
      return false;
    }
    if(!isValidFromToDate(from, to)) {
      setErrors({...errors, to: "A data nao deve ser maior a Desde"});
      return false;
    }
    return true; 
  }