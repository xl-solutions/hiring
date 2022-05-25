export const validateFormQuote = (stock_name, errors, setErrors) => {
    setErrors({});
    console.log("funcion fianl", stock_name);
    if(stock_name === 'none' || stock_name === undefined) {
      setErrors({...errors, name: "Deve inserir um Stock"});
      return false;
    }
    return true; 
  }