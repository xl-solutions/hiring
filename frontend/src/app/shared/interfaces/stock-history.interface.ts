import IStockDetail from './stock-details.interface';

export default interface IStockHistory {
  "name": string,
  "prices": IStockDetail[]
}
