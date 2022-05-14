interface IDateProvider {
  getDatesInRange(start_date: Date, end_date: Date): string[];
}

export { IDateProvider };
