export default (date: Date) => date instanceof Date && isFinite(date as any);
