export const validateFormQuote = (stock_name, errors, setErrors) => {
    setErrors({});
    if(stock_name === 'none') {
      setErrors({...errors, name: "Deve inserir um Stock"});
      return false;
    }
    return true; 
  }