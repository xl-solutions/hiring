export default function oneWeekBefore(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
}
