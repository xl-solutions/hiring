import { isValidStringDate } from "./isValidStringDate";
import { isValidNumber } from "./isValidNumber";

export const validateFormGains = (formData, errors, setErrors) => {
    const {stock_name, purchasedAmount, purchasedAt} = formData;
    setErrors({});
    console.log("aca va: ", errors);
    if(stock_name === 'none' || stock_name === undefined) {
      setErrors({...errors, stock_name: "Deve inserir um Stock"});
      return false;
    }
    if(!isValidStringDate(purchasedAt)) {
      setErrors({...errors, purchasedAt: "O formato da data é invalida"});
      return false;
    }
    if(!isValidNumber(purchasedAmount)) {
      setErrors({...errors, purchasedAmount: "Deve inserir um número"});
      return false;
    }
    return true; 
  }