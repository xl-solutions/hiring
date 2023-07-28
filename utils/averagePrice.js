import formatCurrency from "./priceUtils";

export default function calculateAverage(high, low) {
    high = high.replace(/[^\d.]/g, '')
    low = low.replace(/[^\d.]/g, '')
    high = parseFloat(high)
    low = parseFloat(low)
    let average = ((high + low) / 2)/100
    average = formatCurrency(average)
    return average;
}