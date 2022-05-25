import { isValidStringDate } from "./isValidStringDate";
import { isValidNumber } from "./isValidNumber";

export const validateFormGains = (formData, errors, setErrors) => {
    const {stock_name, purchasedAmount, purchasedAt} = formData;
    setErrors({});
    if(!isValidStringDate(purchasedAt)) {
      setErrors({...errors, purchasedAt: "O formato da data é invalida"});
      return false;
    }
    if(!isValidNumber(purchasedAmount)) {
      setErrors({...errors, purchasedAmount: "Deve inserir um número"});
      return false;
    }
    if(!stock_name) {
      setErrors({...errors, stock_name: "Deve inserir um Stock"});
      return false;
    }
    return true; 
  }