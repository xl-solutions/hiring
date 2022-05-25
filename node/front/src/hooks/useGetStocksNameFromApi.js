import { useState, useEffect } from "react";
import { getStocksNameFromApi } from "../utils/getStocksNameFromApi";

const useGetStocksNameFromApi = () => {
    const [stock, setStocks] = useState([]); 
    useEffect(() => {
        getStocksNameFromApi().then(stocksName => {
            setStocks(stocksName);
        })
      }, []);
    return [stock];
}

export default useGetStocksNameFromApi; 