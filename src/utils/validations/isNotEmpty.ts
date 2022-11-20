export function isNotEmpty(value: string) {
  //undefined, null, "" ou "   "
  if (value) return Boolean(value.trim());
  return false;
}
