export default function dateToIso(date: Date): string {
  return date.toISOString().split('T')[0];
}
