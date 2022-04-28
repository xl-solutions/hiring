import axios from 'axios';

const getStockData = async function (url) {  

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}

export default getStockData;