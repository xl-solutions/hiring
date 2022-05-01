import axios from 'axios';

const currencyConversion = async function (priceToConversion, conversionAtDate, currency) {

  if (currency === "BRL") {
    return priceToConversion;
  }

  const url = `https://www3.bcb.gov.br/bc_moeda/rest/converter/${priceToConversion}/1/220/790/${conversionAtDate}`;

  try {
    const response = await axios.get(url);
    return response.data.value;
  } catch (error) {
    console.error(error);
  }

}

export default currencyConversion;