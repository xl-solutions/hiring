
const convertAndParseFloat = (priceClose: string) =>{
    return Number(parseFloat(priceClose).toFixed(2));
}

export { convertAndParseFloat }